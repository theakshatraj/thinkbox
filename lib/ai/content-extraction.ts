import { createAdminClient } from "@/lib/ai/client";
import { appwriteConfig } from "@/lib/appwrite/config";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { Buffer } from "node:buffer";

export async function extractContent(
  fileId: string,
  extension: string,
): Promise<string> {
  const { storage } = await createAdminClient();

  const arrayBuffer = await storage.getFileDownload(
    appwriteConfig.bucketId,
    fileId,
  );
  const buffer = Buffer.from(arrayBuffer);

  switch (extension) {
    case "pdf":
      return extractPDF(buffer);
    case "txt":
      return buffer.toString("utf-8").trim();
    case "docx":
      return extractDOCX(buffer);
    default:
      return "";
  }
}

async function extractPDF(buffer: Buffer): Promise<string> {
  try {
    const pdf = new PDFParse({ data: buffer });
    const data = await pdf.getText();
    return data.text.trim();
  } catch {
    return "";
  }
}

async function extractTXT(buffer: Buffer): Promise<string> {
  return buffer.toString("utf-8").trim();
}

async function extractDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  } catch {
    return "";
  }
}
