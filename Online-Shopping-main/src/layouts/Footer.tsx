import React from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  InputBase,
  IconButton,
  Container,
} from "@mui/material";
import { IoMail, IoLogoTwitter } from "react-icons/io5";
import { FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
        backgroundColor: "#282c34",
        color: "#fff",
        padding: "40px 20px",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Join Us in Our Journey!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Shipping worldwide within 2-5 business days.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Sign up for exclusive updates and offers.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <InputBase
            placeholder="Your email address"
            type="email"
            required
            sx={{
              width: { xs: "100%", sm: "300px" },
              border: "2px solid #61dafb",
              borderRadius: "20px",
              padding: "12px",
              backgroundColor: "#fff",
              color: "#000",
            }}
          />
          <IconButton
            sx={{
              color: "#61dafb",
              fontSize: "30px",
              ml: 1,
              backgroundColor: "#20232a",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#61dafb", color: "#fff" },
            }}
          >
            <IoMail />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ textAlign: "center" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#61dafb" }}
          >
            About Us
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            We are dedicated to providing the best online shopping experience.
            Our mission is to bring you closer to your favorite products.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="/about" passHref>
              <Typography
                variant="subtitle2"
                sx={{ color: "#61dafb", textDecoration: "underline" }}
              >
                Learn More
              </Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#61dafb" }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link href="https://twitter.com/" passHref>
              <IconButton sx={{ color: "#1DA1F2", padding: "10px" }}>
                <IoLogoTwitter />
              </IconButton>
            </Link>
            <Link href="https://www.instagram.com/" passHref>
              <IconButton sx={{ color: "#C13584", padding: "10px" }}>
                <FaInstagram />
              </IconButton>
            </Link>
            <Link href="https://www.pinterest.com/" passHref>
              <IconButton sx={{ color: "#E60023", padding: "10px" }}>
                <FaPinterest />
              </IconButton>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#61dafb" }}
          >
            Quick Links
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="/" passHref>
              <Typography
                variant="subtitle2"
                sx={{ color: "#61dafb", textDecoration: "none" }}
              >
                Home
              </Typography>
            </Link>
            <Link href="/products" passHref>
              <Typography
                variant="subtitle2"
                sx={{ color: "#61dafb", textDecoration: "none" }}
              >
                Shop
              </Typography>
            </Link>
            <Link href="/contact" passHref>
              <Typography
                variant="subtitle2"
                sx={{ color: "#61dafb", textDecoration: "none" }}
              >
                Contact Us
              </Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#61dafb" }}
          >
            Contact
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            info@onlineshop.com
          </Typography>
          <Typography variant="body2">+1 (234) 567-8900</Typography>
        </Grid>
      </Grid>

      <Typography
        variant="caption"
        sx={{ textAlign: "center", mt: 4, display: "block" }}
      >
        © 2024 Online Shopping | All Rights Reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
