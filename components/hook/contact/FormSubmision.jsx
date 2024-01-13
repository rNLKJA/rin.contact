import emailjs from "emailjs-com";
import { sendConfirmationEmail } from "./sendConfirmationEmail";

export function FormSubmision(
  validate,
  setIsSubmitting,
  formData,
  setOpenDialog,
  setFormData,
) {
  return (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Send the initial contact email
    emailjs
      .send(
        "service_usy8iyr", // Your EmailJS service ID
        "template_ofletrk", // Your EmailJS template ID for the contact form
        formData,
        "FNtLdbiCQJAHye8jA",
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
}
