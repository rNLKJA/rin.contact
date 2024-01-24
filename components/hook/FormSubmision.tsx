import emailjs, { EmailJSResponseStatus } from "emailjs-com";
import { sendConfirmationEmail } from "./sendConfirmationEmail";

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

export function FormSubmision(
  validate: () => boolean,
  setIsSubmitting: (isSubmitting: boolean) => void,
  formData: FormData,
  setOpenDialog: (openDialog: boolean) => void,
  setFormData: (formData: FormData) => void,
) {
  return (event: React.FormEvent<HTMLFormElement>) => {
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
        (response: any) => {
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
        (error: any) => {
          console.log("FAILED...", error);
          alert("Failed to send the message, please try again later.");
          setIsSubmitting(false);
        },
      );
  };
}
