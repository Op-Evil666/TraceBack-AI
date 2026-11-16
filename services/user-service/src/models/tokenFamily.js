import mongoose from "mongoose";

const tokenFamilySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    familyId:{
        type: String,
        required: true,
        unique: true
    },
    tokenHash:{
        type: String,
        required: true
    },
    version:{
        type: Number,
        default: 1
    },
    expiresAt:{
        type: Date,
        required: true
    },
    revoked:{
        type: Boolean,
        default: false
    },
    revokedAt:{
        type: Date,
        default: null
    }
},
{ timestamps: true });

const tokenFamily = mongoose.model("TokenFamily", tokenFamilySchema);

export default tokenFamily;