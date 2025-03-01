'use client';
import { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress, Box } from "@mui/material";

export default function LegalChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ type: "user" | "ai"; text: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setMessages((prev) => [...prev, { type: "user", text: prompt }]);
    setPrompt("");

    try {
      const res = await fetch("/api/legalChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiResponse = data.answer || "No response from AI";
      setMessages((prev) => [...prev, { type: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { type: "ai", text: "Error: Unable to connect to AI" }]);
    }

    setLoading(false);
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ mt: 4, p: 3, backgroundColor: "#121212", borderRadius: 4, minHeight: "80vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ color: "#E0E0E0", textAlign: "center", fontWeight: 700, letterSpacing: "2px", textShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)" }}
      >
        ⚖️ JurisAI - Legal Assistant
      </Typography>

      {/* Chat Messages */}
      <Box 
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          maxHeight: "60vh",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: "75%",
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              background: msg.type === "user" ? "linear-gradient(135deg, #6D28D9, #9333EA)" : "#1E1E1E",
              color: "#FFFFFF",
              padding: "12px 16px",
              borderRadius: "16px",
              boxShadow: msg.type === "user" ? "0px 0px 8px rgba(147, 51, 234, 0.4)" : "none",
              textAlign: "left",
              whiteSpace: "pre-line",
            }}
          >
            {msg.text}
          </Box>
        ))}

        {loading && (
          <Box sx={{ alignSelf: "flex-start", color: "#CCCCCC" }}> 
            ⏳ JurisAI is thinking...
          </Box>
        )}
      </Box>

      {/* Input & Button */}
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: "flex", gap: 2, mt: 2, width: "100%" }}
      >
        <TextField
          label="Ask a legal question..."
          variant="outlined"
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            color: "white",
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.3)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9333EA" },
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading} 
          sx={{
            backgroundColor: "#6D28D9",
            color: "white",
            padding: "12px 24px",
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(109, 40, 217, 0.5)",
            "&:hover": { backgroundColor: "#9333EA" },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send"}
        </Button>
      </Box>
    </Container>
  );
}