export const runtime = "nodejs"; // Ensures Node.js runtime (not Edge)

import { pipeline } from "@xenova/transformers";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({ answer: "❌ Please provide a valid input." }), { status: 400 });
        }

        // Load the model dynamically
        const generator = await pipeline("text-generation", "AdaptLLM/law-LLM", {
            quantized: true, // Reduce memory usage
        });

        // Generate text
        const response = await generator(prompt, { max_length: 512 });

        // Extract generated text
        const generatedText = response?.[0]?.toString() || "❌ No response generated.";

        return new Response(JSON.stringify({ answer: generatedText }), { status: 200 });
    } catch (error) {
        console.error("Error generating response:", error);
        return new Response(JSON.stringify({ answer: "❌ Error generating response." }), { status: 500 });
    }
}