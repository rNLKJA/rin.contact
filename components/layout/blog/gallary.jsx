import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlogBrowsing() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h4>The Meow-nificent Blog for Digital Crafters 🧶</h4>
    </div>
  );
}
