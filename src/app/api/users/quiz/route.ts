import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import quizQuestion from "@/models/quizQuestion";

export async function GET() {
  try {
    await connectDB();
    const questions = await quizQuestion.find();
   
    return NextResponse.json(questions);
    
  } catch (error) {
    return NextResponse.json({ message: "Error fetching questions", error }, { status: 500 });
  }
}
