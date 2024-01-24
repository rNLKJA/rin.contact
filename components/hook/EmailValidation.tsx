import * as EmailValidator from "email-validator";

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface Errors {
  from_name: string;
  from_email: string;
  message: string;
}

export function EmailValidation(
  formData: FormData,
  setErrors: (errors: Errors) => void,
): () => boolean {
  return (): boolean => {
    let tempErrors: Errors = {
      from_name: formData.from_name ? "" : "This field is required.",
      from_email: formData.from_email
        ? EmailValidator.validate(formData.from_email)
          ? ""
          : "Invalid email address."
        : "This field is required.",
      message: formData.message ? "" : "This field is required.",
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };
}
