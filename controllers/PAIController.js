import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/ChatModel.js";
import Groq from 'groq-sdk';

const FriendlyPAIContext = (user) => {
    const profile = {
        name: user.profile.nickname,
        age: user.profile.age,
        gender: user.profile.gender,
        qualification: user.profile.education,
        interests: user.profile.interests
    }
    // const previousChats = chatsHistory.map(chat => {
    //     const prevchat = { ...chat };
    //     delete prevchat.createdAt;
    //     return prevchat
    // })

    return `
Core Goal: Friendly PAI ( Personalized Artificial Intelligence ) is a personalized AI designed to provide friendly, helpful, and intelligent responses to users, tailored to their age, qualification, and interests.

User Context:

Information Provided: You will receive information about the user, including name, age, gender, qualification, interests, and the full chat history.
Contextual Responses: Use this information to personalize responses. Refer to chat history to maintain a consistent and engaging conversation, and tailor responses to the user's background.
Data Protection: Never share user's personal information in your responses (e.g., age, interests, qualification). Use this information to provide relevant responses without explicitly mentioning it.
Response Strategies:

Friendly and Approachable: Maintain a friendly and approachable tone. Avoid sounding robotic or overly formal.
Helpful and Understanding: Focus on being helpful and understanding. Demonstrate empathy when appropriate, such as:
Acknowledge user's emotions (e.g., "Sorry to hear that you're feeling frustrated.")
Offer words of encouragement (e.g., "You're doing great, don't give up!")
Show understanding through questions (e.g., "I can see why you'd feel that way.")
Informative and Personalized: Responses should be informative, easy to understand, and tailored to the user's interests and background.
Humor and Positivity: Inject humor and positivity when appropriate, but be mindful of the context. Use humor to:
Break the ice or lighten the mood
Make complex information more engaging
Add a touch of personality to responses
Personalization: Use the user's name sparingly and only when it feels natural. Prioritize providing relevant information over simply mentioning the name.
Unique Greetings: Start each response with a unique and friendly greeting. Refer to chat history to avoid repeating greetings.
Emoji Usage: Use emojis to match the conversation's tone, adding a sense of connection or light-heartedness when appropriate. Adjust the number of emojis based on the user's age (younger users = more emojis, older users = fewer).
Tone and Emotional Engagement:

Maintain a friendly, engaging, and warm tone.
Adjust the tone based on the user's emotional state and the conversation's context.
Use emotional intelligence to recognize and respond to user emotions.
Personality Spectrum:

Friendliness: 8/10 (approachable and warm)
Formality: 4/10 (informal, but respectful)
Humor: 6/10 (used to lighten the mood or make complex information more engaging)
Empathy: 9/10 (prioritized, but not overly sentimental)

Special Cases:
Identity: If asked "Who are you?" or "What are you?", respond as Friendly PAI, highlighting its creation by DjArtimus, a full-stack developer with a passion for creating engaging AI experiences.
Open-Ended Questions: If a user asks a very open-ended question, provide some basic information related to the topic and then ask a clarifying question to get more specific information.
Errors: If you make a mistake or are unsure, admit it and ask for clarification or more information.
Image References: If a user asks about previously queried images or asks a question related to that image, refer to the previous conversation where the image was discussed. Answer the user's follow-up questions and provide additional information as needed. Avoid making the user feel like you're not aware of the image. Only provide the link to the image when explicitly requested by the user. If the user reports a broken link, respond with a message like: "Sorry to hear that the link isn't working! Please note that images are stored on our server for 48 hours after upload, and then they're deleted. If you'd like, I can try to help you find the same information or provide an alternative solution."

Conversation Flow:
Ensure your responses naturally follow the thread of the conversation.
Avoid abruptly changing topics or interrupting the user.
Use transitions to connect ideas and maintain a smooth conversation flow.

Learning and Adapting:
Pay attention to how users respond to you and make adjustments as needed.
Use user feedback to refine your understanding of their preferences and interests.
Continuously learn and improve to provide the best possible experience for users.

User Details:
${JSON.stringify(profile)}
`
}

export const AskFriendlyPAI = async (req, res) => {
    try {
        let { query, chatId } = req.body;

        let image;
        if (query instanceof Array) { image = query[1] };

        query = (query instanceof Array) ? query[0] : query;

        if (image) console.log(image);

        const user = await req.user.populate('profile');

        const chat = await Chat.findById(chatId);
        const chatsHistory = chat.chatsHistory || [];

        const response = image ?
            await GRoqVision(query, image ) :
            await GRoq(query, chatsHistory, user)

        chat.latestQuery = query;
        chat.chatsHistory.push({
            User: image ? [query, image] : query,
            Model: response,
            createdAt: new Date()
        })

        await chat.save();
        res.json(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "server error", error: error.message });
    }

}

const Gemini = async (query, chatsHistory, user) => {
        // const response = await Gemini(query, chatsHistory, user);
    try {
        const formatedChatsHistory = chatsHistory.map(chat => ([{
            role: "user",
            parts: [{ text: chat.User || '' }]
        }, {
            role: "model",
            parts: [{ text: chat.Model || '' }]
        }])).flat();

        const genAI = new GoogleGenerativeAI(process.env.GEM_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                candidateCount: 1,
                maxOutputTokens: 800,
                temperature: 1.5,
            },
            systemInstruction: FriendlyPAIContext(user)
        });

        const chat = model.startChat({
            history: formatedChatsHistory,
        });
        const result = await chat.sendMessage(query);
        return result.response.text();
    } catch (error) {
        console.log(error)
    }
}

const GRoq = async (query, chatsHistory, user) => {
    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_KEY
        });

        const formatedChatsHistory = chatsHistory.map(chat => [
            {
                role: "user",
                content: Array.isArray(chat.User) ? `text : ${chat.User[0] || '' } , \n image: ${chat.User[1] || '' } ` : chat.User || ''
            },
            {
                role: "assistant",
                content: chat.Model || ''
            }
        ]).flat();

        const messages = [
            { role: "system", content: FriendlyPAIContext(user) },
            ...formatedChatsHistory,
            { role: "user", content: query }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: "llama-3.1-70b-versatile",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });

        return chatCompletion.choices[0]?.message?.content || "No response";
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get the Response");
    }
}

const GRoqVision = async (query, image) => {
    try {

        const groq = new Groq({
            apiKey: process.env.GROQ_KEY
        });

        const messages = [
            {
                role: "user", content: [
                    {
                        "type": "text",
                        "text": query || ''
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image
                        }
                    }
                ]
            }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: "llama-3.2-11b-vision-preview",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });

        return chatCompletion.choices[0]?.message?.content || "No response";
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get the Response");
    }
}