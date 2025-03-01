import { HfInference } from "@huggingface/inference";
import { log } from "console";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// TODO: Restrict the AI to legal queries 

const legalCategories = [
    "Legal",
    "Criminal Law",
    "Corporate Law",
    "Family Law",
    "Constitutional Law",
    "Intellectual Property Law",
    "Taxation Law",
    "Labor & Employment Law",
    "Human Rights Law",
    // "International Law",
  ];

const classifyQuery = async (text: string) => {
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
            candidate_labels: legalCategories.concat(["Non-Legal"]),
            multi_label: false,
            hypothesis_template: "This question is related to {} law.",
          },
      }),
    });
    const data = await response.json();
    console.log(data);
    
    const isLegal = data?.labels?.some((label: any, index: number) => legalCategories.includes(label) && data?.scores?.[index] > 0.4);

    return isLegal;
  };

  
export async function POST(req: Request) {
    try {
      const { prompt } = await req.json();
    //   const isLegal = await classifyQuery(prompt);
    //     if (!isLegal) {
    //         return NextResponse.json({ answer: "🚫 This AI is designed exclusively for legal inquiries. Kindly ask a law-related question" });
    //     }
      if (!prompt) {
        return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
      }
  
      console.log("Received prompt:", prompt);
  
      const response = await hf.textGeneration({
        model: "meta-llama/Meta-Llama-3-8B-Instruct", 
        inputs: prompt,
        parameters: {
            // max_new_tokens: 500, // Reduce token count to minimize generation time
            temperature: 0.3, // Lower randomness for more deterministic responses
            top_k: 20, // Lower vocabulary choices for quick processing
            top_p: 0.9, // Balanced probability sampling (keeps quality intact)
            repetition_penalty: 1.2, // Prevents repetitive responses
            stop_sequences: ['\n\n',"."],
            do_sample: false, // Use greedy decoding for fast, deterministic output
        },
      });
  
      console.log("Response from Hugging Face:", response);
  
      return NextResponse.json({ answer: response.generated_text });
    } catch (error) {
      console.error("Hugging Face API Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }