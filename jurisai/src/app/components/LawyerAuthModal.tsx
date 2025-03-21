"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Upload, CheckCircle } from "lucide-react";

const specializations = [
  "Corporate Law",
  "Sports Law",
  "Criminal Law",
  "Intellectual Property",
  "Family Law",
];

interface LawyerAuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LawyerAuthModal({
  open,
  onClose,
}: LawyerAuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [barId, setBarId] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleBarUpload = (e: any) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000); // Dummy loader for verification
    setBarId(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (
      isSignUp &&
      (!email || !password || !specialization || !barId || !isVerified)
    )
      return;
    if (!isSignUp && (!email || !password)) return;
    window.location.href = "/lawyerDashboard";
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          textAlign: "center",
          backgroundColor: "#121212",
          color: "#E0E0E0",
          fontWeight: "bold",
          fontSize: "1.5rem",
          paddingY: 2,
        }}
      >
        {isSignUp ? "Sign Up as a Lawyer" : "Login as a Lawyer"}
      </DialogTitle>

      <DialogContent
        sx={{
          marginBottom: "8px",
          backgroundColor: "#1E1E1E",
          color: "#E0E0E0",
          padding: 4,
        }}
      >
        <Box
          component="form"
          sx={{
            paddingTop: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            className="mt-4"
            fullWidth
            InputProps={{
              style: {
                color: "#E0E0E0",
                backgroundColor: "#2A2A2A",
                borderRadius: "8px",
              },
            }}
            InputLabelProps={{ style: { color: "gray" } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            InputProps={{
              style: {
                color: "#E0E0E0",
                backgroundColor: "#2A2A2A",
                borderRadius: "8px",
              },
            }}
            InputLabelProps={{ style: { color: "gray" } }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Specialization Dropdown */}
          {isSignUp && (
            <>
              <TextField
                select
                label="Specialization"
                fullWidth
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                InputProps={{
                  style: {
                    color: "#E0E0E0",
                    backgroundColor: "#2A2A2A",
                    borderRadius: "8px",
                  },
                }}
                InputLabelProps={{ style: { color: "gray" } }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        backgroundColor: "#1E1E1E", // Dark background for the dropdown
                        color: "#E0E0E0",
                        borderRadius: "8px",
                        "& .MuiMenuItem-root": {
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#333", // Sleek hover effect
                            color: "#fff",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {specializations.map((spec) => (
                  <MenuItem
                    key={spec}
                    value={spec}
                    sx={{ backgroundColor: "transparent", color: "#E0E0E0" }}
                  >
                    {spec}
                  </MenuItem>
                ))}
              </TextField>

              {/* Bar Council ID Upload */}
              <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  borderRadius: "8px",
                  padding: "10px",
                  "&:hover": { backgroundColor: "#388E3C" },
                }}
              >
                <Upload size={20} />
                Upload Bar Council ID
                <input type="file" hidden onChange={handleBarUpload} />
              </Button>

              {/* Verification Status */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                {isVerifying && (
                  <CircularProgress size={24} sx={{ color: "lightgreen" }} />
                )}
                {isVerified && <CheckCircle size={32} color="lightgreen" />}
              </Box>
            </>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "lightgreen",
              color: "black",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
            onClick={handleSubmit}
            disabled
            // disabled={
            //   isSignUp &&
            //   (!email || !password || !specialization || !barId || !isVerified)
            // }
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>

          {/* Toggle Login/Signup */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: "lightgray",
              "&:hover": { color: "white" },
              marginTop: 1,
            }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
