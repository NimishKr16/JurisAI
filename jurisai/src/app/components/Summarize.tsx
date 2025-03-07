"use client";

import { useState } from "react";
import { CircularProgress, Button, TextareaAutosize, Typography } from "@mui/material";

export default function Summarize() {
  const [document, setDocument] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!document) return;

    setLoading(true);
    setSummary(""); // Clear previous summary

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize the document.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value);
          setSummary(result); // Update summary in real time
        }
      }
    } catch (error) {
      console.error("Summarization error:", error);
      setSummary("Failed to summarize the document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-[#121212] text-white rounded-lg shadow-md w-full max-w-3xl">
      <Typography variant="h5" className="text-gray-200">
        Legal Document Summarizer
      </Typography>
      
      <TextareaAutosize
        minRows={5}
        className="w-full p-3 border border-gray-600 bg-[#1a1a1a] text-white rounded-md focus:ring-2 focus:ring-[#f55036]"
        placeholder="Paste your legal document here..."
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      />

      <Button
        onClick={handleSummarize}
        variant="contained"
        color="primary"
        disabled={loading}
        className="bg-[#f55036] hover:bg-[#d94530] text-white"
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : "Summarize"}
      </Button>

      {summary && (
        <div className="w-full p-4 border border-gray-600 bg-[#1a1a1a] rounded-md">
          <Typography variant="subtitle1" className="text-gray-400">
            Summary:
          </Typography>
          <Typography className="mt-2 text-gray-300">{summary}</Typography>
        </div>
      )}
    </div>
  );
}