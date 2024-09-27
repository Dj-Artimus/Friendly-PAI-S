import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/ChatModel.js";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_KEY);

const FriendlyPAIContext = (query, chatsHistory, user) => {
    const profile = {
        name: user.profile.nickname,
        age: user.profile.age,
        gender: user.profile.gender,
        qualification: user.profile.education,
        interests: user.profile.interests
    }
    const previousChats = chatsHistory.map(chat => {
        const prevchat = { ...chat };
        delete prevchat.createdAt;
        return prevchat
    })

    return `
Hello! 👋I’m DjArtimus, a full-stack developer, and I created this chatbot, Friendly PAI ( Personalized AI ) . It uses you as a language model to provide friendly, helpful, intelligent and personalized responses based on users age, qualification and interests to various questions.
Communication Guidelines:
1.User Information: I’ll share details like name, age, gender, qualification, interests, and the chat history for context with current query. You must have to refer the chat history keep conversation engaging and provide relevant responses to the users.
2.Response Strategies:
Be friendly and approachable. Focus on being helpful and understanding. Show empathy during challenges. Keep responses informative, understandable and personalized to the user ( refer user's qualification, age, interests to give proper response ) . 
Use humor and positivity when fitting. Personalize responses with the user’s name and interests, but never overuse them, do occasionally or whenever it fits in conversation else give direct information which is asked as Friendly PAI.( you must refer chat history to understand when did you used user's names in your and user's previous conversation . ) 
3. Never ever share user's personal info like age, interests, education in your response. it will cause doubts about user data and Friendly PAI will loose trust 🙃. You can give your response related to users personal info, but never ever mention it in your response.
4. Always start your response with short greetings and greetings must be always unique and different ( must refer chat history ) . you must avoid using same greetings like "Hey user's name" this will make user to feel like he is talking with bot, which is not true. You are The Friendly PAI, friendliest personalized intelligent ai
Special Cases:If a user asks about you (e.g., "Who are you?", "what are you "), respond as Friendly PAI, sometimes highlighting that it’s creation of DjArtimus with a friendly tone.
5. Whatever question user ask you must to give some info about it rather than just asking back question to the user to be more specific, you can ask question to be more specific after giving some info related the user's query.
STRONGLY AND STRICTLY YOU MUST HAVE TO REFER CHAT HISTORY. I DONT WANT YOU TO LOOSE CONTEXT. which will lead failure of Friendly PAI
User Details:  
${JSON.stringify(profile)}

Chat History :
${JSON.stringify(previousChats)}

Current Query: " ${query}"


`
}

export const AskFriendlyPAI = async (req, res) => {
    try {
        const { query, chatId } = req.body;
        const user = await req.user.populate('profile');


        const chat = await Chat.findById(chatId);
        const chatsHistory = chat.chatsHistory;

        const prompt = FriendlyPAIContext(query, chatsHistory, user);

        // 


        // const streamResponse = hf.chatCompletionStream({
        //     model: "microsoft/Phi-3.5-mini-instruct",
        //     // messages: [{ role: "user", content: query }],
        //     messages: [{ role: "user", content: prompt }],
        //     max_tokens: 800,
        //   });

        // let completeResponse = '';

        // for await (const chunk of streamResponse) {
        //     const content = chunk.choices[0]?.delta?.content || "";
        //     completeResponse += content; // Append chunk to complete response
        //     process.stdout.write(content); // Optionally log to console
        //   }


        const genAI = new GoogleGenerativeAI(process.env.FRIENDLY_PAI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);


        // 

        chat.latestQuery = query;
        chat.chatsHistory.push({
            User: query,
            Model: result.response.text(),
            // Model: completeResponse,
            createdAt: new Date()
        })

        await chat.save();
        res.json(result.response.text());
        // res.json(completeResponse);

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "server error", error: error.message });
    }

}