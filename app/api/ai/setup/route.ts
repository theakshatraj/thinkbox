import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export async function POST() {
  try {
    const { databases } = await createAdminClient();

    const attributes: Record<string, any> = {
      content: { key: "content", type: "string", default: "", required: false },
      summary: { key: "summary", type: "string", default: "", required: false },
      description: { key: "description", type: "string", default: "", required: false },
      tags: { key: "tags", type: "array", items: "string", default: [], required: false },
      category: { key: "category", type: "string", default: "", required: false },
      aiStatus: { key: "aiStatus", type: "string", default: "pending", required: true },
    };

    const results: string[] = [];
    for (const [key, attr] of Object.entries(attributes)) {
      try {
        await databases.createAttribute(
          appwriteConfig.databaseId,
          appwriteConfig.filesCollectionId,
          attr.key,
          attr,
        );
        results.push(`Added: ${key}`);
      } catch {
        results.push(`Already exists or skipped: ${key}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Failed to setup AI attributes" },
      { status: 500 },
    );
  }
}
