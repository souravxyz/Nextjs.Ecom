"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "@/api/functions/authApi";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Font and Colors
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      main: "#6C63FF", // Primary Purple color
    },
    secondary: {
      main: "#FF6584", // Accent Pink color
    },
    background: {
      default: "#F0F0F0",
      paper: "#FFFFFF",
    },
  },
});

// Container with Background Image
const BackgroundContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "url('/profile-bg.jpg') no-repeat center center fixed",
  backgroundSize: "cover",
}));

// Floating Profile Card
const ProfileCard = styled(Box)(({ theme }) => ({
  maxWidth: "500px",
  padding: theme.spacing(5),
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparent White
  borderRadius: "20px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
  },
}));

// Styled Typography with Gradient
const GradientTypography = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #6C63FF, #FF6584)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
  fontSize: "2rem",
  marginBottom: theme.spacing(4),
}));

// Gradient Button with Animation
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #6C63FF, #FF6584)",
  color: "#FFF",
  padding: theme.spacing(1.5, 4),
  borderRadius: "30px",
  fontSize: "1rem",
  textTransform: "none",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

// Profile Component
const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  if (user === null) {
    return <Typography align="center">Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <ProfileCard>
          <GradientTypography>
            Welcome, {user.name || "Guest"}!
          </GradientTypography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Email: {user.email}
          </Typography>
          <Box mt={4}>
            <GradientButton onClick={handleLogout}>Logout</GradientButton>
          </Box>
        </ProfileCard>
      </BackgroundContainer>
    </ThemeProvider>
  );
};

export default Profile;
