import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import UserResponse from "@/models/UserResponse";
import Result from "@/models/Result";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await connectDB();
    const responses = await UserResponse.find({ userId });

    const traitScores: Record<string, number> = {};
    responses.forEach((response) => {
      if (response.selectedOption) {
        const { personalityTrait, score } = response.selectedOption;
        traitScores[personalityTrait] = (traitScores[personalityTrait] || 0) + score;
      }
    });

    const result = await Result.findOneAndUpdate(
      { userId },
      { userId, traitScores: Object.entries(traitScores).map(([trait, score]) => ({ trait, score })) },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Result calculated", result });
  } catch (error) {
    return NextResponse.json({ message: "Error calculating result", error }, { status: 500 });
  }
}
