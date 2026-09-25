import { getOpenAI } from "@/lib/ai/client";

export async function generateFileMetadata(
  content: string,
): Promise<{
  summary: string;
  description: string;
  tags: string[];
  category: string;
}> {
  if (!content || content.length === 0) {
    return {
      summary: "",
      description: "",
      tags: [],
      category: "Other",
    };
  }

  const openai = getOpenAI();

  const response = await openai.chat.completions.create({
    model: "anthropic/claude-3.5-sonnet",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a file analysis assistant. Given the content of a file, generate a structured JSON response with the following fields:
        - "summary": a concise 2-3 sentence summary of what the file is about
        - "description": a short description (1-2 sentences) of the file's content
        - "tags": an array of relevant keywords/tags (3-8 tags)
        - "category": one of the following: Education, Work, Research, Personal, Creative, Technology, Finance, Health, Other

        Return ONLY valid JSON, no markdown code blocks or extra text.`,
      },
      {
        role: "user",
        content: `File content:\n\n${content}`,
      },
    ],
  });

  const raw = response.choices[0].message.content;
  if (!raw) {
    throw new Error("AI provider returned empty response");
  }

  const parsed = JSON.parse(raw);

  return {
    summary: parsed.summary || "",
    description: parsed.description || "",
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    category: parsed.category || "Other",
  };
}
