"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  fontSize: "1.5rem",
  color: theme.palette.secondary.main,
  textAlign: "center",
}));

const ContactWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.default,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ContactDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const ContactForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[5],
}));

const ContactButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default function Contact() {
  return (
    <Box margin={4}>
      <Typography variant="h2" align="center" gutterBottom>
        Reach Out to Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ContactWrapper>
            <SectionTitle variant="h5">Our Location</SectionTitle>
            <ContactDetails>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="location" color="primary">
                  <LocationOnIcon />
                </IconButton>
                <Typography variant="body1" marginLeft={1}>
                  456 Elm St, New York, NY 10001, USA
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="phone" color="primary">
                  <PhoneIcon />
                </IconButton>
                <Typography variant="body1" marginLeft={1}>
                  +1 (987) 654-3210
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="email" color="primary">
                  <EmailIcon />
                </IconButton>
                <Typography variant="body1" marginLeft={1}>
                  support@newcompany.com
                </Typography>
              </Box>
            </ContactDetails>
          </ContactWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactWrapper>
            <SectionTitle variant="h5">Get in Touch</SectionTitle>
            <ContactForm>
              <TextField
                label="Your Full Name"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Your Email Address"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
              />
              <ContactButton variant="contained">Submit Message</ContactButton>
            </ContactForm>
          </ContactWrapper>
        </Grid>
      </Grid>
      <MapWrapper>
        <iframe
          title="Google Maps - 456 Elm St, New York"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.123456789123!2d-74.005972!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1e8c0a1c7f%3A0xa1a1a1a1a1a1a1a1!2s456%20Elm%20St%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e1!3m2!1sen!2sin!4v1679800000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </MapWrapper>
    </Box>
  );
}
