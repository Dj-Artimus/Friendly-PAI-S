import Chat from "../models/ChatModel.js";
import Profile from "../models/ProfileModel.js";
import User from "../models/UserModel.js";

export const createProfile = async (req, res) => {
    try {

        const user = req.user;

        const { nickname, dob, age, gender, education, interests } = req.body;

        const userProfile = await Profile.findOne({ user: user._id }); // check for existing user profile


        if (userProfile) {
            userProfile._id = userProfile._id;
            userProfile.user = userProfile.user;
            userProfile.nickname = nickname ? nickname : userProfile.nickname;
            userProfile.dob = dob ? dob : userProfile.dob;
            userProfile.age = age ? age : userProfile.age;
            userProfile.gender = gender ? gender : userProfile.gender;
            userProfile.education = education ? education : userProfile.education;
            userProfile.interests = interests ? interests : userProfile.interests;

            await userProfile.save();
            user.profile = userProfile._id;
            await user.save();

            res.status(201).json({ success: true, message: "Profile updated successfully." });

        } else {
            const profile = await Profile.create({
                user: user._id,
                nickname,
                dob,
                age,
                gender,
                education
            });

            user.profile = profile._id;
            await user.save();
            res.status(201).json({ success: true, message: "Profile created successfully." });
        }


    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create your Profile. Please try again.", error: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const profile = await Profile.findOne({ user: userId });
        if (!profile) return res.status(404).json({ success: false, message: "User profile not found." });
        res.json({ user, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error to get the Profile", error: error.message })
    }
}

export const createChat = async (req, res) => {
    try {
        const user = req.user;
        const userId = user._id;

        const chat = await Chat.create({
            user: userId
        })

        // user.chats = chat._id;
        user.chats.push(chat._id);
        await user.save();

        res.status(201).json({ success: true, message: "New chat created successfully", chatId: chat._id , chatsHistory: chat.chatsHistory })

    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to create chat. Server Error" })
        console.log(error)
    }
}

export const getLatestChat = async (req,res) => {
    try {
        const user = req.user;
        const chatId = user.chats;

        

        const latestChat = await Chat.findById(chatId[chatId.length - 1]);
        if (latestChat) {
            const isLatestChatValid = (new Date() - new Date(latestChat.createdAt)) < (1000 * 60 * 60 * 24)
    
            if( isLatestChatValid ) {
                const chatsHistory = latestChat.chatsHistory;
                return res.json({ chatId: latestChat._id, chatsHistory , createdAt:latestChat.createdAt ,});
            }
        }

        createChat(req,res);

    } catch (error) {
        res.status(500).json({success: false, message: "Unable to fetch chats..."})
    }
}

export const getAllChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ user: userId }).sort({ createdAt: 1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in fetching chats"})
    }
}

export const delChat = async (req, res) => {
    try {
        const chatId = req.body.chatId;
        const user = req.user;
        let chats = user.chats;
        chats.splice(chats.indexOf(chatId), 1);
        await user.save();

        const chat = await Chat.findByIdAndDelete(chatId);

        if (!chat) return res.status(404).json({ success: false, message: "Chat not found, Unable to delete." });

        res.json({ success: true, message: "Chat deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in deleting chat", error: error.message })
    }
}

export const getChatConversations = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const conversations = await Chat.findById(chatId)
        res.json(conversations.chatsHistory);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in fetching conversations", error: error.message })

    }
}
