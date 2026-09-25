export interface AIFileMetadata {
  summary: string;
  description: string;
  tags: string[];
  category: string;
}

export interface ProcessFileInput {
  fileId: string;
  storageFileId: string;
  accountId: string;
}

export interface ProcessFileResult {
  success: boolean;
  aiStatus: "completed" | "failed";
  error?: string;
}

export interface ContentExtractionResult {
  content: string;
  extension: string;
}
