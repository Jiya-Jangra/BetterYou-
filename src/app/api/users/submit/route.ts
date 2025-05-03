import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import UserResponse from "@/models/UserResponse";

export async function POST(req: Request) {
  try {
    const { userId, questionId, selectedOption } = await req.json();
    console.log("Received data:", { userId, questionId, selectedOption });

    if (!userId || !questionId || !selectedOption) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const response = new UserResponse({ userId, questionId, selectedOption });
    await response.save();

    return NextResponse.json({ message: "Response saved", response }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving response", error }, { status: 500 });
  }
}
