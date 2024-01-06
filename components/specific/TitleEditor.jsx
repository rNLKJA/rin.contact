import { TextField } from "@mui/material";

const TitleEditor = ({ section }) => {
  // Implement the editor UI and logic for title sections
  return (
    <TextField
      label="Title"
      variant="outlined"
      value={section.content}
      // TODO: Add onChange handler to update section content
    />
  );
};

export default TitleEditor;
