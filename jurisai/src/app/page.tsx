"use client";

import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col items-center justify-center min-h-screen text-center gap-8"
    >
      {/* Hero Section */}
      <Box className="flex flex-col items-center gap-4">
        <Typography
          variant="h2"
          component="h1"
          className="text-4xl font-bold text-gray-900 sm:text-6xl"
        >
          <span className="text-gray-500">Welcome to</span> <span className="text-blue-600">JurisAI</span>
        </Typography>
        <Typography variant="h6" className="text-lg text-gray-600 sm:text-xl">
          <span className="text-white">Your AI-powered legal assistant for document analysis, case summarization, and lawyer assistance.</span>
        </Typography>
      </Box>

      {/* Call to Action */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
        onClick={() => router.push("/login")}
      >
        Get Started - Login
      </Button>

      {/* Features Section */}
      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <FeatureCard
          title="AI Legal Chatbot"
          description="Get instant legal insights with our smart AI-powered chatbot."
        />
        <FeatureCard
          title="Document Analysis"
          description="Analyze legal documents and extract key insights effortlessly."
        />
        <FeatureCard
          title="Case Summarization"
          description="Quickly understand complex legal cases with AI-generated summaries."
        />
      </Box>
    </Container>
  );
}

// Feature Card Component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Box className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <Typography variant="h5" className="font-semibold text-gray-900">
        {title}
      </Typography>
      <Typography variant="body1" className="text-gray-600 mt-2">
        {description}
      </Typography>
    </Box>
  );
}