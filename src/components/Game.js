import GameBoard from "./GameBoard";
import { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Player from "./Player";
import DiceRoll from "./DiceRoll";
import AccuseSuggest from "../modals/AccuseSuggest";
import Notebook from "./Notebook";

//import rooms, weapons, and people from sockets here

const Game = () => {

  const [suggestAccuse, setSuggestAccuse] = useState(false);

  const handleOpenSuggestAccuse = () => {
    setSuggestAccuse(true);
  };

  return (
    <>
      <h2 className="headerText">Hunch</h2>
      <div className="suggestAccuseBtns">
        <button className="modalBtnStyling" onClick={handleOpenSuggestAccuse}>
          Suggest | Accuse
        </button>
        <AccuseSuggest
          suggestAccuse={suggestAccuse}
          setSuggestAccuse={setSuggestAccuse}
        />
      </div>
      <div className="flexGameboard">
        <GameBoard />
        <div className="sideBar">
          <DiceRoll />
          <Player />
        </div>
      </div>
      <Notebook />
    </>
  );
};

export default Game;
