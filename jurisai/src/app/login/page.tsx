"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/askJuris"); // Redirect to protected page after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "#121212", // Uniform background color
        color: "#E0E0E0", // Light gray text for readability
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* JurisAI Branding */}
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          Juris<span style={{ color: "#4CAF50" }}>AI ⚖️</span>
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
          We use trusted sign-in only for hassle-free and secure logins.
        </Typography>

        {/* Google Login Button with Framer Motion */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            startIcon={<FcGoogle size={22} />}
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: "lightgreen", // Matching theme green
              color: "black",
              padding: "12px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#388E3C" }, // Slightly darker green on hover
            }}
          >
            Sign in with Google
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default LoginPage;