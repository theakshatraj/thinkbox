import { appwriteConfig } from "@/lib/appwrite/config";
import { Databases, Models } from "node-appwrite";
import { createAdminClient } from "@/lib/ai/client";
import { extractContent } from "./content-extraction";
import { generateFileMetadata } from "./generate-metadata";
import type { ProcessFileInput, ProcessFileResult } from "./types";

export async function processFile({
  fileId,
  storageFileId,
  accountId,
}: ProcessFileInput): Promise<ProcessFileResult> {
  const { databases } = await createAdminClient();

  try {
    const fileDoc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
    );

    const file = fileDoc as Models.Document;
    const extension = (file.extension as string) || "";

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      { aiStatus: "processing" },
    );

    const content = await extractContent(storageFileId, extension);

    const metadata = await generateFileMetadata(content);

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        content,
        summary: metadata.summary,
        description: metadata.description,
        tags: metadata.tags,
        category: metadata.category,
        aiStatus: "completed",
      },
    );

    return { success: true, aiStatus: "completed" };
  } catch (error: unknown) {
    console.error("AI processing failed for file:", fileId, error);

    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        fileId,
        { aiStatus: "failed" },
      );
    } catch {
      // Best effort: even if we can't update status, the file is still intact
    }

    return {
      success: false,
      aiStatus: "failed",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
