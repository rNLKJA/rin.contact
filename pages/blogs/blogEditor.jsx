import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TextField, Button } from "@mui/material";

// Dynamic imports for editor components (to avoid SSR issues with document/window)
const TitleEditor = dynamic(() => import("@/components/specific/TitleEditor"));
// const ParagraphEditor = dynamic(() => import("../components/ParagraphEditor"));
// const ImageEditor = dynamic(() => import("../components/ImageEditor"));
// ... import other editors

const BlogEditor = () => {
  const router = useRouter();
  const { edit } = router.query;
  //   const edit = true;
  const [sections, setSections] = useState([]);
  const [newFileName, setNewFileName] = useState("");

  useEffect(() => {
    // TODO: Load initial data from JSON file or API
  }, []);

  const onDragEnd = (result) => {
    // TODO: Reorder sections based on drag result
  };

  const handleCreateFile = async () => {
    try {
      const response = await fetch("/.netlify/functions/createFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: newFileName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create file");
      }

      const data = await response.json();
      console.log("File created:", data);
      // Update your state or UI as necessary
    } catch (error) {
      console.error("Error creating file:", error.message);
    }
  };

  if (edit === true) {
    return (
      <div className="flex flex-col">
        {!newFileName && (
          <CreateNewFile
            newFileName={newFileName}
            setNewFileName={setNewFileName}
            handleCreateFile={handleCreateFile}
          />
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {/* Map through sections and render appropriate editor based on type */}
                {sections.map((section, index) => {
                  switch (section.type) {
                    case "title":
                      return <TitleEditor key={index} section={section} />;
                    //   case "paragraph":
                    //     return <ParagraphEditor key={index} section={section} />;
                    //   case "image":
                    //     return <ImageEditor key={index} section={section} />;
                    // ... cases for other types
                    default:
                      return null;
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  } else {
    return (
      <div>
        {sections.map((section, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }
};

export default BlogEditor;

const CreateNewFile = ({ newFileName, setNewFileName, handleCreateFile }) => {
  return (
    <div className="flex flex-row justify-center gap-2 ">
      <TextField
        label="New Blog Name"
        variant="outlined"
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateFile}
        style={{ backgroundColor: "black", color: "white" }}
      >
        Create File
      </Button>
    </div>
  );
};
