import GameBoard from "./GameBoard";
import { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Player from "./Player";
import DiceRoll from "./DiceRoll";
import AccuseSuggest from "../modals/AccuseSuggest";
import Notebook from "./Notebook";
import WinModal from "../modals/WinModal";
import LoseModal from "../modals/LoseModal";

//import rooms, weapons, and people from sockets here

const Game = () => {
  const { fakeplayer, playerwin, playerlost } = useContext(SocketContext);
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
          <Player playerInfo={fakeplayer} />
        </div>
      </div>
      <Notebook />
      {playerwin ? <WinModal/> : null}
      {playerlost ? <LoseModal/> : null}
    </>
  );
};

export default Game;
