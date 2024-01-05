import React from "react";
import Link from "next/link";

const Game = () => {
  return (
    <div>
      <h2>Web Game List</h2>
      <ul className="list-disc pl-8">
        <li className="link-hover">
          <Link href="/games/dino">Dinosaur (incomplete)</Link>
        </li>
        <li className="link-hover">
          <Link href="/games/guess-the-number">Guess the number</Link>
        </li>
      </ul>
    </div>
  );
};

export default Game;
