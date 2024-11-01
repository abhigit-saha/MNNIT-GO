import mongoose from "mongoose";

const huntSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    locations: [{
        name: {
            type: String,
            required: true
        },
        hint: {
            type: String,
            required: true
        }
    }],
    clues: [{
        text: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        isUnlocked: {
            type: Boolean,
            default: false
        }
    }],
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Hunt = mongoose.model("Hunt", huntSchema);
export default Hunt;
