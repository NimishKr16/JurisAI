'use client';

import { useChat } from '@ai-sdk/react';
import { useAuth } from "@/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import * as pdfjsLib from 'pdfjs-dist'; // Import PDF processing library
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { user, logout, loading } = useAuth();
  const [documentText, setDocumentText] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect only when Firebase has finished checking auth
    }
  }, [user, router, loading]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    if (file.type === "application/pdf") {
      // ✅ Extract text from PDF
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      let text = "";
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + "\n";
      }
  
      setDocumentText(text); // Store extracted text
    } else {
      // ✅ Handle text files (same as before)
      reader.onload = (e) => setDocumentText(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleSubmitWithFile = (event: React.FormEvent) => {
    event.preventDefault();
    const inputWithDoc = documentText
    ? `Document Context: ${documentText}\n\nUser Query: ${input}`
    : input;

  // Set the input value to include document context before submitting
  handleInputChange({ target: { value: inputWithDoc } } as React.ChangeEvent<HTMLInputElement>);

  // Submit the form
  handleSubmit();
  };

   // Show a loading indicator while checking auth state
   if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

   // Render only if logged in
   if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-2xl py-8 px-4">
        <div className="space-y-4 mb-4">
          {messages.map(m => (
            <div 
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg px-4 py-2
                  ${m.role === 'user' 
                    ? 'bg-blue-100 text-black' 
                    : 'bg-gray-100 text-black'}
                `}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {m.role === 'user' ? 'You' : 'JurisAI powered by Groq'}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitWithFile} className="flex gap-4">
        <input
        type="file"
        accept=".txt,.md,.json,.csv,.pdf"
        onChange={handleFileUpload}
        className="mb-2 text-sm text-gray-500"
      />
          <div className="flex gap-4">
    <input
      value={input}
      onChange={handleInputChange}
      placeholder="Type your message..."
      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#f55036]"
    />
    <button 
      type="submit"
      className="rounded-lg bg-[#f55036] px-4 py-2 text-white hover:bg-[#d94530] focus:outline-none focus:ring-2 focus:ring-[#f55036]"
    >
      Send
    </button>
  </div>
        </form>
        <Button
        variant="contained"
        onClick={logout}
        sx={{
          mt: 2,
          backgroundColor: "#D32F2F",
          "&:hover": { backgroundColor: "#B71C1C" },
        }}
      >
        Logout
      </Button>
      </div>
    </div>
  );
};

  

