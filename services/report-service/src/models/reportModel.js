import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150
    },
    location:{
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    dateFound: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved'],
        default: 'pending'
    },
    images: [{
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}]
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);

