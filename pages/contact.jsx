import React from "react";
import Container from "@mui/material/Container";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import emailjs from "emailjs-com";
import "../styles/globals.css";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Zoom } from "react-awesome-reveal";

export default function ContactPage() {
  return (
    <Zoom triggerOnce cascade duration={1000} damping={0.5}>
      <ContactForm />;
    </Zoom>
  );
}

const ContactForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = {};
    tempErrors.from_name = formData.from_name ? "" : "This field is required.";
    tempErrors.from_email = formData.from_email
      ? ""
      : "This field is required.";
    tempErrors.message = formData.message ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Send the initial contact email
    emailjs
      .send(
        "service_usy8iyr", // Your EmailJS service ID
        "template_ofletrk", // Your EmailJS template ID for the contact form
        formData,
        "FNtLdbiCQJAHye8jA", // Your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setOpenDialog(true); // Open the dialog here
          // Send the confirmation email to the user
          sendConfirmationEmail(formData, setIsSubmitting);
          // Reset form data
          setFormData({
            from_name: "",
            from_email: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send the message, please try again later.");
          setIsSubmitting(false);
        },
      );
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Contact Me ( ´ ω ` )
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="from_name"
            label="Name"
            name="from_name"
            autoComplete="name"
            autoFocus
            value={formData.from_name}
            onChange={handleChange}
            error={!!errors.from_name}
            helperText={errors.from_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="from_email"
            label="Email Address"
            name="from_email"
            autoComplete="email"
            value={formData.from_email}
            onChange={handleChange}
            error={!!errors.from_email}
            helperText={errors.from_email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
            style={{ backgroundColor: "#000000" }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle style={{ textAlign: "center" }}>
              🐾 Meow! Message Sent 🐾
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                style={{ textAlign: "center", fontSize: "18px" }}
              >
                Thanks for sending me the email! 😺
              </DialogContentText>
              <br />
              <DialogContentText
                style={{ textAlign: "center", fontSize: "18px" }}
              >
                I've send you a confirmation email!
              </DialogContentText>
              <br />
              <DialogContentText
                style={{ textAlign: "center", fontSize: "18px" }}
              >
                I'll paw-sitively get back to you ASAP! 🐱💕
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                onClick={handleDialogClose}
                color="primary"
                variant="contained"
                style={{ backgroundColor: "#FFA726" }}
              >
                Close 🐾
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Container>
  );
};

const sendConfirmationEmail = (formData, setIsSubmitting) => {
  const userConfirmationData = {
    to_name: formData.from_name,
    to_email: formData.from_email,
  };

  emailjs
    .send(
      "service_usy8iyr",
      "template_e1p2t9b",
      userConfirmationData,
      "FNtLdbiCQJAHye8jA",
    )
    .then(
      (response) => {
        console.log(
          "Confirmation Email SUCCESS!",
          response.status,
          response.text,
        );
      },
      (error) => {
        console.log("Confirmation Email FAILED...", error);
      },
    )
    .finally(() => {
      setIsSubmitting(false);
    });
};
