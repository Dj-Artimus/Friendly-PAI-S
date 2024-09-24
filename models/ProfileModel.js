import mongoose from 'mongoose';

const profileModel = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true
    },
    dob: {
        type: Array,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    interests: {
        type: Array,
    }

}, {
    timestamps: true
});

const Profile = mongoose.model("Profile", profileModel);

export default Profile;