"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/functions/authApi"; // Ensure the correct path
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme similar to the registration page
const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h5: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#FF6B6B", // Same red for primary actions
    },
    secondary: {
      main: "#6C63FF", // Same purple for background and accents
    },
  },
});

// Gradient background and form container
const BackgroundContainer = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #6C63FF, #FF6B6B)", // Background gradient
});

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "500px",
  width: "100%",
  padding: theme.spacing(6),
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "15px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
  },
}));

// Floating TextField component
const FloatingTextField = styled(TextField)({
  "& label": {
    transition: "all 0.3s ease",
  },
  "& .Mui-focused label": {
    color: "#FF6B6B", // Same color focus effect
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6C63FF", // Initial border color
    },
    "&:hover fieldset": {
      borderColor: "#FF6B6B", // Hover effect
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF6B6B", // Focus border color
    },
  },
});

// Styled gradient button
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #6C63FF, #FF6B6B)",
  color: "#FFF",
  width: "100%",
  padding: theme.spacing(2),
  borderRadius: "30px",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setSubmitError(null); // Clear errors
    try {
      await login({ email: data.email, password: data.password }); // Call the login function
      toast.success("Login successful!"); // Success toast
      reset();
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      toast.error("Login failed. Please try again."); // Error toast
      setSubmitError("Invalid email or password.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <FormContainer>
          <Typography variant="h5" gutterBottom>
            Welcome Back
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mb: 2,
            }}
          >
            <Link href={"/"} passHref>
              <Button variant="text" color="secondary">
                Close X
              </Button>
            </Link>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingTextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />
            <FloatingTextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />
            {submitError && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mt: 1 }}
              >
                {submitError}
              </Typography>
            )}
            <GradientButton type="submit">Login</GradientButton>
          </form>
          <Link href={"/register"} passHref>
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "#6C63FF", cursor: "pointer" }}
            >
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </FormContainer>
      </BackgroundContainer>
    </ThemeProvider>
  );
}
