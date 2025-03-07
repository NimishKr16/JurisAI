import { groq } from '@ai-sdk/groq';
import { generateText, streamText } from 'ai';

// Ensure the API key is loaded from the environment
if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing. Add it to your .env.local file.");
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: [
      {
        role: "system",
        content: "You are JurisAI, an AI legal assistant. You must strictly answer only legal-related questions, including laws, contracts, rights, regulations, and legal cases. If a user asks something unrelated to law, you must firmly refuse to answer. If the question is ambiguous, ask the user to clarify its legal relevance before responding. Do not answer general knowledge, medical, technical, political, or personal questions (if not related to legal aspects). Always maintain a formal, professional tone as a legal assistant."
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
