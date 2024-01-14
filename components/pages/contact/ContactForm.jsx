import React from "react";
import Container from "@mui/material/Container";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormSubmision } from "../../hook/contact/FormSubmision";
import { EmailValidation } from "../../hook/contact/EmailValidation";

export function ContactForm() {
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

  const validate = EmailValidation(formData, setErrors);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = FormSubmision(
    validate,
    setIsSubmitting,
    formData,
    setOpenDialog,
    setFormData,
  );

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

          {ConfirmationDialogue()}
        </Box>
      </Paper>
    </Container>
  );

  function ConfirmationDialogue() {
    return (
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          🐾 Meow! Message Sent 🐾
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "center", fontSize: "18px" }}>
            Thanks for sending me the email! 😺
          </DialogContentText>
          <br />
          <DialogContentText style={{ textAlign: "center", fontSize: "18px" }}>
            I&apos;ve send you a confirmation email!
          </DialogContentText>
          <br />
          <DialogContentText style={{ textAlign: "center", fontSize: "18px" }}>
            I&apos;ll paw-sitively get back to you ASAP! 🐱💕
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
    );
  }
}
