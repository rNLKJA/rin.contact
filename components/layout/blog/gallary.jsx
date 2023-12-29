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

      <div className="grid md:grid-cols-2  items-center py-10 px-4 gap-5">
        <div className="flex col-span-1 justify-center items-center">
          <Image
            src="/melbourne-style.png"
            width={400}
            height={400}
            alt="melbourne style"
            responsive
            quality={75}
            style={{ borderRadius: 20 }}
          />
        </div>
        <div>Lastest Blog</div>
      </div>
    </div>
  );
}
