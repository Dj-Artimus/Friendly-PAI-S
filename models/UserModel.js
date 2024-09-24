import mongoose from "mongoose";

const userModel = await mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profile : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    },
    chats : {
        type: [mongoose.Schema.Types.ObjectId],
        ref : "Chat"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    userVerificationOTP : String,
    userVerificationOTPExpiresAt : Date,
    resetPasswordToken : String,
    resetPasswordTokenExpiresAt : Date
}, {
    timestamps : true
});

const User = mongoose.model("User",userModel);

export default User;