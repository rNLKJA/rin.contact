import emailjs from "emailjs-com";

export const sendConfirmationEmail = (
  formData: { from_name: string; from_email: string }, // Add the type for formData
  setIsSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void },
) => {
  const userConfirmationData = {
    to_name: formData.from_name,
    to_email: formData.from_email, // Fix the property name
  };

  emailjs
    .send(
      "service_usy8iyr",
      "template_e1p2t9b",
      userConfirmationData,
      "FNtLdbiCQJAHye8jA",
    )
    .then(
      (response: Response) => {
        console.log(
          "Confirmation Email SUCCESS!",
          response.status,
          response.text,
        );
      },
      (error: any) => {
        console.log("Confirmation Email FAILED...", error);
      },
    )
    .finally(() => {
      setIsSubmitting(false);
    });
};
