import mongoose from "mongoose";

const chatModel = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    latestQuery : {
        type: String,
        default: "New Chat"
    },
    chatsHistory : {
        type : Array,
        default : []
    },
},{
    timestamps: true
})

const Chat = mongoose.model("Chat",chatModel);
export default Chat;