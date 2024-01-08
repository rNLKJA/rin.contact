import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const contentTypes = [
  "image",
  "subtitle",
  "bold text",
  "italic",
  "link",
  "list",
  "codeblock",
  "file",
];

const Page = () => {
  const [sections, setSections] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [contentInput, setContentInput] = useState("");

  const addSection = (layout) => {
    const newSection = {
      "section-grid-layout": layout,
      content: [],
      canAddSubsection: true,
    };
    setSections([...sections, newSection]);
  };

  const addContentToSection = (index) => {
    const updatedSections = [...sections];
    const newContent = {
      type: selectedContentType,
      data: contentInput,
      isEditable: true,
    };
    updatedSections[index].content.push(newContent);
    setSections(updatedSections);
    setContentInput(""); // Clear input after adding
  };

  const editContentInSection = (sectionIndex, contentIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content[contentIndex].isEditable = true;
    setSections(updatedSections);
  };

  const updateContentInSection = (sectionIndex, contentIndex, newData) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content[contentIndex].data = newData;
    updatedSections[sectionIndex].content[contentIndex].isEditable = false;
    setSections(updatedSections);
  };

  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const savePage = () => {
    const pageData = {
      title: pageTitle,
      author,
      date,
      content: sections,
    };
    console.log(JSON.stringify(pageData));
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: 3 }}>
      <Container maxWidth="lg">
        {/* Existing inputs and layout */}
        {sections.map((section, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 2, my: 2, position: "relative" }}
          >
            {/* Existing delete button */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="content-type-label">Content Type</InputLabel>
              <Select
                labelId="content-type-label"
                value={selectedContentType}
                label="Content Type"
                onChange={(e) => setSelectedContentType(e.target.value)}
              >
                {contentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Content"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addContentToSection(index)}
              style={{ backgroundColor: "black", marginTop: "10px" }}
            >
              Add Content
            </Button>
            <Grid container spacing={2}>
              {section.content.map((content, cIndex) => (
                <Grid
                  item
                  xs={12}
                  lg={section["section-grid-layout"] === 1 ? 12 : 6}
                  key={cIndex}
                  onDoubleClick={() => editContentInSection(index, cIndex)}
                >
                  <Paper elevation={1} sx={{ p: 2, minHeight: "150px" }}>
                    {content.isEditable ? (
                      <TextField
                        fullWidth
                        value={content.data}
                        onChange={(e) =>
                          updateContentInSection(index, cIndex, e.target.value)
                        }
                        onBlur={() =>
                          updateContentInSection(index, cIndex, content.data)
                        }
                      />
                    ) : (
                      <p>{content.data}</p>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
        {/* Existing section add buttons */}
      </Container>
    </Box>
  );
};

export default Page;
