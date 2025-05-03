import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        personalityTrait: { type: String, required: true }, // Related trait
        score: { type: Number, required: true }, // Score for this option
      },
    ],})
const QuizQuestion = mongoose.models.Question || mongoose.model("Question", QuestionSchema);
export default QuizQuestion;
 