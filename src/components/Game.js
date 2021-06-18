import GameBoard from "./GameBoard";
import { useState, useEffect } from "react";

const rooms = [
  "Red room",
  "Blue room",
  "Green room",
  "Yellow room",
  "Orange room",
  "Purple room",
];

const weapons = [
  "Candlestick",
  "Knife",
  "Rope",
  "Revolver",
  "Lead pipe",
  "Wrench",
];

const persons = [
  "Miss Scarlet",
  "Colonel Mustard",
  "Mrs. White",
  "Mr. Green",
  "Mrs. Peacock",
  "Professor Plum",
];

const Game = () => {
  return (
    <>
      <h2 className="headerText">Hunch</h2>
      <GameBoard />
    </>
  );
};

export default Game;
