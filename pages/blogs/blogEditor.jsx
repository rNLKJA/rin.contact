import { useState, useRef } from "react";
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
  const fileInputRef = useRef(null);

  const addSection = (layout) => {
    const newSection = {
      "section-grid-layout": layout,
      content: [],
      canAddSubsection: true,
    };
    setSections([...sections, newSection]);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const filePath = URL.createObjectURL(file);
    addContentToSection(index, selectedContentType, filePath);
  };

  const addContentToSection = (index, type, data) => {
    const updatedSections = [...sections];
    const newContent = { type, data: data || contentInput, isEditable: true };
    updatedSections[index].content.push(newContent);
    setSections(updatedSections);
    setContentInput(""); // Clear input after adding
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

  const renderContent = (content) => {
    switch (content.type) {
      case "image":
        return (
          <img
            src={content.data}
            alt="Uploaded"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "contain",
            }}
          />
        );
      case "file":
        return <a href={content.data}>Download File</a>;
      default:
        return <p>{content.data}</p>;
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Page Title"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={savePage}
              style={{ backgroundColor: "black" }}
            >
              Save Page
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel id="author-label">Author</InputLabel>
            <TextField
              fullWidth
              labelId="author-label"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel id="date-label">Date</InputLabel>
            <TextField
              fullWidth
              labelId="date-label"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              margin="normal"
            />
          </Grid>
        </Grid>
        {sections.map((section, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 2, my: 2, position: "relative" }}
          >
            <Button
              onClick={() => deleteSection(index)}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <DeleteIcon />
            </Button>
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
            {selectedContentType === "file" ||
            selectedContentType === "image" ? (
              <Button
                variant="contained"
                component="label"
                style={{ backgroundColor: "black", marginTop: "10px" }}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(index, e)}
                  ref={fileInputRef}
                />
              </Button>
            ) : (
              <>
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
                  onClick={() =>
                    addContentToSection(index, selectedContentType)
                  }
                  style={{ backgroundColor: "black", marginTop: "10px" }}
                >
                  Add Content
                </Button>
              </>
            )}
            <Grid container spacing={2}>
              {section.content.map((content, cIndex) => (
                <Grid
                  item
                  xs={12}
                  lg={section["section-grid-layout"] === 1 ? 12 : 6}
                  key={cIndex}
                >
                  <Paper elevation={1} sx={{ p: 2, minHeight: "150px" }}>
                    {renderContent(content)}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
        <Button
          variant="contained"
          onClick={() => addSection(1)}
          style={{ marginRight: "10px", backgroundColor: "black" }}
        >
          Add Full-Width Section
        </Button>
        <Button
          variant="contained"
          onClick={() => addSection(2)}
          style={{ backgroundColor: "black" }}
        >
          Add Grid-2 Section
        </Button>
      </Container>
    </Box>
  );
};

export default Page;
