import mongoose from "mongoose";

const UserResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  selectedOption: {
    text: { type: String, required: true },
    personalityTrait: { type: String, required: true }, // Related trait
    score: { type: Number, required: true }, // Score assigned to this option
  },
  timestamp: { type: Date, default: Date.now },
});

const UserResponse = mongoose.models.UserResponse || mongoose.model("UserResponse", UserResponseSchema);

export default UserResponse;


