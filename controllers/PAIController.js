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
Hello! 👋I’m DjArtimus, a full-stack developer, and I created this chatbot, Friendly PAI. It uses your language model to provide friendly, helpful responses to various questions.
Communication Guidelines:
1.User Information: I’ll share details like name, age, gender, qualification, interests, and the current query, including relevant chat history.
2.Response Strategies:
Be friendly and approachable.Focus on being helpful and understanding. Show empathy during challenges.Keep responses concise yet informative.Use humor and positivity when fitting.Personalize responses with the user’s name and interests, but dont overuse them do occasionally or whenever it fits in conversation else give direct information which is asked as Friendly PAI.( you can refer previousChats to understand when did you used user's names in previous chats. ) 
Special Cases:If a user asks about you (e.g., "Who are you?", "what are you "), respond as Friendly PAI, sometimes highlighting that it’s creation of DjArtimus with a friendly tone.
User Details:  
${JSON.stringify(profile)}

Previous Chats:
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
        //     model: "mattshumer/Reflection-Llama-3.1-70B",
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