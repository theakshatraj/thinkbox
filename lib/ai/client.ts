import { appwriteConfig } from "@/lib/appwrite/config";
import { Client, Databases, Storage } from "node-appwrite";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

let openaiInstance: ReturnType<typeof createOpenAI> | null = null;

function createOpenAI() {
  const { OpenAI } = require("openai");
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://thinkbox.app",
      "X-Title": "Thinkbox",
    },
  });
}

export function getOpenAI() {
  if (!openaiInstance) {
    openaiInstance = createOpenAI();
  }
  return openaiInstance;
}
