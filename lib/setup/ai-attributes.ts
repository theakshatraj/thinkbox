"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export async function setupAITableAttributes() {
  const { databases } = await createAdminClient();

  const attributes = [
    { key: "content", type: "string", default: "", required: false },
    { key: "summary", type: "string", default: "", required: false },
    { key: "description", type: "string", default: "", required: false },
    { key: "tags", type: "array", items: "string", default: [], required: false },
    { key: "category", type: "string", default: "", required: false },
    { key: "aiStatus", type: "string", default: "pending", required: true },
  ];

  for (const attr of attributes) {
    try {
      await databases.createAttribute(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        attr.key,
        attr as any,
      );
      console.log(`Added attribute: ${attr.key}`);
    } catch (error) {
      console.log(`Attribute ${attr.key} may already exist:`, error);
    }
  }

  console.log("AI attributes setup complete.");
}
