'use client';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GavelIcon from "@mui/icons-material/Gavel"; // Law Icon
import ChatIcon from "@mui/icons-material/Chat"; // Chatbot Icon
import DescriptionIcon from "@mui/icons-material/Description"; // Document Analysis Icon
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LinearGradient } from 'react-text-gradients'
// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3F51B5" }, // Blue Accent
    secondary: { main: "#FF4081" }, // Pink Accent
    background: { default: "#0A0A0A", paper: "#121212" },
    text: { primary: "#FFFFFF", secondary: "#B0BEC5" },
  },
  typography: { fontFamily: "Arial, sans-serif" },
});

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

export default function Home() {
  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "background.default",
        color: "text.primary",
        p: 4,
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          position: "absolute",
          top: 0,
        }}
      >
        <Typography variant="h5" fontWeight="bold" component={motion.div} initial="hidden" animate="visible" variants={fadeIn}>
          JurisAI ⚖️
        </Typography>
        <Button onClick={() => router.push("/askJuris")}
         variant="contained" color="secondary" component={motion.button} whileHover={{ scale: 1.05 }}>
          Get Started
        </Button>
      </Box>
        
      {/* Hero Section */}
      <Container maxWidth="md">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
          <LinearGradient gradient={['to left', '#3F51B5 ,#FFD700']}>
          JurisAI ⚖️
          </LinearGradient>
          </Typography>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Your AI-Powered Legal Assistant
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Get instant legal insights, document analysis, and case summaries powered by AI.
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button onClick={() => router.push("/askJuris")}
             variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
              Start Free Consultation
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container spacing={4}>
          {[ 
            { icon: <ChatIcon />, title: "AI Legal Chatbot", desc: "Get quick answers to your legal queries with our smart AI-powered assistant." },
            { icon: <DescriptionIcon />, title: "Legal Document Analyzer", desc: "Upload legal documents and let AI scan, summarize, and assess risks." },
            { icon: <GavelIcon />, title: "Case Summarization", desc: "Get instant case summaries and insights for legal research." },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: index * 0.2 }}>
                <Box sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2, textAlign: "center" }}>
                  <motion.div whileHover={{ scale: 1.1 }}>{feature.icon}</motion.div>
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 1.5 }}>
        <Box sx={{ mt: 8, py: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} JurisAI. All rights reserved.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  </ThemeProvider>
  );
}
