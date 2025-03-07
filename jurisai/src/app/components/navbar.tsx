"use client";

import { useAuth } from "@/context/AuthContext";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#121212" }}>
      <Toolbar className="flex justify-between">
        {/* Left - Logo & Menu for Mobile */}
        <div className="flex items-center gap-4">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} className="md:hidden">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="font-bold text-[#f55036]">
            JurisAI
          </Typography>
        </div>

        {/* Center - Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Button color="inherit" component={Link} href="/askJuris">
            Chat
          </Button>
          <Button color="inherit" component={Link} href="/summarize">
            Summarizer
          </Button>
        </div>

        {/* Right - User Info & Logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Typography variant="body1" className="hidden md:block text-gray-300">
                {user.displayName || "User"}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ borderColor: "#f55036", color: "#f55036", "&:hover": { backgroundColor: "#d94530", color: "white" } }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" component={Link} href="/login">
              Login
            </Button>
          )}
        </div>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250, backgroundColor: "#1a1a1a", height: "100%", color: "white" }}>
          <ListItem>
            <Typography variant="h6" sx={{ color: "#f55036" }}>
              JurisAI
            </Typography>
          </ListItem>
          <ListItemButton component={Link} href="/askJuris" onClick={toggleDrawer}>
            Chat
          </ListItemButton>
          <ListItemButton component={Link} href="/summarize" onClick={toggleDrawer}>
            Summarizer
          </ListItemButton>
          {user && (
            <ListItemButton onClick={handleLogout} sx={{ color: "#f55036" }}>
              <LogoutIcon sx={{ marginRight: 1 }} />
              Logout
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}