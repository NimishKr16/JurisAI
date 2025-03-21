import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = groq("llama3-70b-8192");

    const result = await generateText({
      model,
      messages: [
        {
          role: "system",
          content:
            "Generate a short, clear, and professional title summarizing the following chat. Keep it under 7 words.",
        },
        ...messages,
      ],
    });

    const chatTitle = result.text?.trim() || "Untitled Chat";

    return Response.json({ title: chatTitle });
  } catch (error) {
    console.error("Error generating chat title:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate chat title." }),
      { status: 500 }
    );
  }
}
