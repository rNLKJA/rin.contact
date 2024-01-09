"use client";

import React, { useState, useEffect } from "react";
import { BlockNoteEditor } from "@blocknote/core";

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BlogEditor() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("rNLKJA");
  const [datetime, setDatetime] = useState(
    new Date().toLocaleDateString("en-AU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  );

  const editor = typeof document !== "undefined" ? useBlockNote({}) : null;

  const handleFileInput = (event) => {
    // File input logic
  };

  return (
    <div>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="Date & Time"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <Button
        onClick={() => {
          /* Load JSON logic */
        }}
      >
        Load JSON
        <input
          type="file"
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
      </Button>
      {editor && <BlockNoteView editor={editor} />}
    </div>
  );
}

export default BlogEditor;
