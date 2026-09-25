import { NextRequest, NextResponse } from "next/server";
import { processFile } from "@/lib/ai/process-file";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, accountId } = body as { fileId: string; accountId: string };

    if (!fileId || !accountId) {
      return NextResponse.json(
        { error: "fileId and accountId are required" },
        { status: 400 },
      );
    }

    const result = await processFile({ fileId, accountId });
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI process route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
