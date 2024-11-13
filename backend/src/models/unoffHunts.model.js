import mongoose from "mongoose";

const huntSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  roomId: {
    type: String,
    required: true,
  },
  locations: [
    {
      name: {
        type: String,
        required: true,
      },
      clues: [
        {
          image: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          hint: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
          isUnlocked: {
            type: Boolean,
            default: false,
          },
          isQr: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

const UnoffHunt = mongoose.model("Unoffhunt", huntSchema);
export default UnoffHunt;
