// components/DinoGame.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export const DinoGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [position, setPosition] = useState(0); // Dinosaur's vertical position
  const [gameOver, setGameOver] = useState(false);
  const [frame, setFrame] = useState(0); // For animation frames

  const jump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setFrame(0); // Reset frame to initial position during a jump
      setTimeout(() => {
        setIsJumping(false); // The dinosaur falls back down
      }, 500); // The duration of the jump
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping, gameOver]);

  useEffect(() => {
    if (isJumping) {
      // This will create a simple animation of the jump
      const interval = setInterval(() => {
        setPosition((prevPosition) =>
          prevPosition < 100 ? prevPosition + 20 : 100,
        );
      }, 50);
      setTimeout(() => clearInterval(interval), 500); // Duration of the jump up
    } else {
      setPosition(0); // Reset position when not jumping

      // Running animation when not jumping
      const runningInterval = setInterval(() => {
        setFrame((prevFrame) => (prevFrame === 0 ? 1 : 0)); // Toggle between frame 0 and 1
      }, 200); // Adjust speed as necessary
      return () => clearInterval(runningInterval);
    }
  }, [isJumping]);

  useEffect(() => {
    const checkCollision = setInterval(() => {
      const dinoRight = 50 + 50; // Dino's left position + width
      const obstacleLeft = window.innerWidth - 150; // Obstacle's right position (adjust based on actual positioning)
      if (dinoRight >= obstacleLeft && position < 50) {
        // Check if they occupy the same space and dino isn't high enough
        setGameOver(true);
        alert("Game Over!");
      }
    }, 50);

    return () => clearInterval(checkCollision);
  }, [position]);

  return (
    <Box className="dino-game-container h-48 bg-gray-100 relative">
      <Box
        className={`dino bg-green-700 ${isJumping ? "bg-green-800" : ""}`} // Change color to indicate a jump
        sx={{
          height: "50px",
          width: "50px",
          position: "absolute",
          bottom: `${position}px`,
          left: "50px",
          backgroundImage: `url('/dino-run-${frame}.png')`, // Add different frames as background images
          backgroundSize: "cover",
        }}
      />
      <Box
        className="obstacle bg-red-700"
        sx={{
          height: "50px",
          width: "20px",
          position: "absolute",
          bottom: "0px",
          right: "150px",
        }}
      />
      <Typography className="text-center mt-4">Press Space to jump!</Typography>
    </Box>
  );
};
