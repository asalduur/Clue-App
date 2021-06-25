import GameBoard from "./GameBoard";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Player from "./Player";
import DiceRoll from "./DiceRoll";
// import Hand from "./Hand";
import AccuseSuggest from "../modals/AccuseSuggest";
import Suggestion from "../modals/Suggestion";
import Notebook from "./Notebook";
import WinModal from "../modals/WinModal";
import LoseModal from "../modals/LoseModal";

//import rooms, weapons, and people from sockets here

const Game = () => {
  const { playerwin, playerlost, active, activeSA } = useContext(SocketContext);

  return (
    <>
      <h2 className="headerText">Hunch</h2>
      <div className="suggestAccuseBtns">
        <AccuseSuggest />
      </div>
      <div className="flexGameboard">
        <GameBoard />
        <div className="sideBar">
          <DiceRoll />
          <Player />
          {/* <Hand /> */}
        </div>
      </div>
      <Notebook />
      <WinModal />
      <LoseModal />
      {active && activeSA ? <Suggestion /> : null}
    </>
  );
};

export default Game;
