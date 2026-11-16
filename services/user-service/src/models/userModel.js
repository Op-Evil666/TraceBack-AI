import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verificationOtpHash:{
        type: String,
        default: null
    },
    verificationOtpExpiresAt:{
        type: Date,
        default: null
    },
    verificationOtpAttempts: {
        type: Number,
        default: 0,
        min: 0,
        select: false
    },
    verificationOtpLastSentAt: {
        type: Date,
        default: null,
        select: false
    },
    verificationOtpLockedUntil: {
        type: Date,
        default: null,
        select: false
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;