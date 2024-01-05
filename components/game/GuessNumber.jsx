// pages/game.js
import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const Game = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100");
  const [target] = useState(Math.floor(Math.random() * 100) + 1);

  const checkGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (numGuess === target) {
      setMessage("🎉 Congratulations! You guessed correctly.");
    } else if (numGuess < target) {
      setMessage("👇 Too low! Try a higher number.");
    } else {
      setMessage("☝️ Too high! Try a lower number.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="bg-white min-h-screen flex flex-col justify-center items-center"
    >
      <Typography variant="h3" gutterBottom className="font-bold text-black">
        Guess the Number Game
      </Typography>
      <Typography variant="body1" className="text-black mb-4">
        {message}
      </Typography>
      <div className="flex flex-row items-center">
        <TextField
          label="Your Guess"
          variant="outlined"
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="mr-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={checkGuess}
          style={{ backgroundColor: "black", color: "white" }}
        >
          Guess
        </Button>
      </div>
    </Container>
  );
};

export default Game;
