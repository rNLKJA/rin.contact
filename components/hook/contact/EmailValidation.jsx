import * as EmailValidator from "email-validator";

export function EmailValidation(formData, setErrors) {
  return () => {
    let tempErrors = {};
    tempErrors.from_name = formData.from_name ? "" : "This field is required.";
    tempErrors.from_email = formData.from_email
      ? EmailValidator.validate(formData.from_email)
        ? ""
        : "Invalid email address."
      : "This field is required.";
    tempErrors.message = formData.message ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };
}
