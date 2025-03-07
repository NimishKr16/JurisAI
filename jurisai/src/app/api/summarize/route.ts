import { groq } from "@ai-sdk/groq";
import { generateText, streamText } from "ai";

// Ensure the API key is loaded from the environment
if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing. Add it to your .env.local file.");
}

// Allow streaming responses up to 60 seconds for larger documents
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { document } = await req.json();

    if (!document) {
      return new Response(JSON.stringify({ error: "No document provided" }), {
        status: 400,
      });
    }

    // Summarization prompt
    const messages = [
      {
        role: "system",
        content:
          "You are an AI legal assistant specializing in document summarization. Provide concise yet detailed summaries of legal documents while preserving key details.",
      },
      { role: "user", content: `Summarize this document:\n\n${document}` },
    ];

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"), // Use the best available model
       // Summarization prompt
        messages : [
        {
          role: "system",
          content:
            "You are an AI legal assistant specializing in document summarization. Provide concise yet detailed summaries of legal documents while preserving key details.",
        },
        { role: "user", content: `Summarize this document:\n\n${document}` },
      ]
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in summarization:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the document." }),
      { status: 500 }
    );
  }
}