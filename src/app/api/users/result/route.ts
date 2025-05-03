import { NextRequest, NextResponse } from "next/server";
import Result from "@/models/Result";
import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getDataFromToken(req); // assumes you're getting userId from token

    const result = await Result.findOne({ userId });
    if (!result) {
      return NextResponse.json({ message: "Result not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Result found",
      traitScores: result.traitScores,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching result", error }, { status: 500 });
  }
}