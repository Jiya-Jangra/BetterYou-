import mongoose from "mongoose";


const ResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    traitScores: [
      {
        trait: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
  });


const Result =mongoose.models.Result ||  mongoose.model("Result", ResultSchema);

export  default Result ;
