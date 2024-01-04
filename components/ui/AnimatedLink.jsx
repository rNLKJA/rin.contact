import React, { useState } from "react";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import { Fade } from "react-awesome-reveal";

const AnimatedLink = ({ href, IconComponent, children }) => {
  const [isHovered, setIsHovered] = useState(false); // Local hover state

  // Event handlers for mouse enter and leave
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Tooltip title={children} placement="top" arrow>
      <Link
        href={href}
        className="relative group mx-2"
        onMouseEnter={handleMouseEnter} // Bind the event handler
        onMouseLeave={handleMouseLeave} // Bind the event handler
      >
        <div className="flex items-center overflow-hidden space-x-2 transition-all duration-300 ease-in-out">
          {/* Icon as a component, always visible */}
          <IconComponent />

          {/* Fade animation tied with isHovered state */}
          {isHovered && (
            <Fade duration={1000} direction="right" triggerOnce>
              <span
                className="ml-2 duration-300 ease-in-out transition-all whitespace-nowrap"
                style={{
                  maxWidth: isHovered ? "1000px" : "0",
                  overflow: "hidden",
                }} // Smooth width transition
              >
                {children}
              </span>
            </Fade>
          )}
        </div>
      </Link>
    </Tooltip>
  );
};

export default AnimatedLink;
