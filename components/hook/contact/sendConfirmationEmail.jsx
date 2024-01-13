import emailjs from "emailjs-com";

export const sendConfirmationEmail = (formData, setIsSubmitting) => {
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
