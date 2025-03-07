'use client';

import { useChat } from '@ai-sdk/react';
import { useAuth } from "@/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import * as pdfjsLib from 'pdfjs-dist'; // Import PDF processing library
import Tooltip from '@mui/material/Tooltip';
import { LinearGradient } from 'react-text-gradients';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js`;


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { user, logout, loading } = useAuth();
  const [fileName, setFileName] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState<string | null>(null);
  const router = useRouter();

  // Get reference to messages container
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]); // Auto-scrolls when messages update

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect only when Firebase has finished checking auth
    }
  }, [user, router, loading]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name); // Store the file name for display
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
    ? `Document Context: ${documentText}\n\nMy Query: ${input}`
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
    
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
  
    <div className="mx-auto w-full max-w-2xl py-8 px-6">
      <div className='mb-20 text-center'>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          <LinearGradient gradient={['to left', '#3F51B5 ,#FFD700']}>
          JurisAI ⚖️
          </LinearGradient>
        </Typography>  
      </div>

      <div 
      ref={messagesContainerRef}
      className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
        {messages.map(m => (
          <div 
            key={m.id} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] rounded-lg px-4 py-2
                ${m.role === 'user' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-900 text-gray-300'}
              `}
            >
              <div className="text-xs text-gray-400 mb-1">
                {m.role === 'user' ? 'You' : 'JurisAI powered by Groq'}
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {m.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitWithFile} className="space-y-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          />
          <button 
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white font-semibold hover:opacity-90 shadow-lg transition-all"
          >
            Send
          </button>
        </div>

        {/* File Upload */}
        <div className="flex justify-center">
          <Tooltip title= "Upload Document to Summarize">

          <label className="cursor-pointer bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-lg text-sm font-medium text-gray-300 transition-all shadow-md">
          {fileName ? fileName : "Upload Document"}
            <input
              type="file"
              accept=".txt,.md,.json,.csv,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              />
          </label>
              </Tooltip>
        </div>
      </form>
    </div>
  </div>
  );
};

  

