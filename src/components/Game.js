import GameBoard from "./GameBoard";
import { useContext, useState } from "react";
// import { SocketContext } from "../context/SocketContext";
import Player from "./Player";
import DiceRoll from "./DiceRoll";
import AccuseSuggest from "../modals/AccuseSuggest";
import Suggestion from "../modals/Suggestion";
import Notebook from "./Notebook";
import WinModal from "../modals/WinModal";
import LoseModal from "../modals/LoseModal";
import ResetGame from '../modals/ResetGame';

const Game = () => {
  // const { playerwin, playerlost, active, activeAccuse, activeSA, proofmsg } = useContext(SocketContext);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <h2 className="headerText">Hunch</h2>
      <div className="suggestAccuseBtns">
        <button onClick={() => setModalOpen(!modalOpen)} >Suggest/Accuse</button>
        <AccuseSuggest modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
      <div className="flexGameboard">
        <GameBoard modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <div className="sideBar">
          <DiceRoll />
          <Player />
        </div>
      </div>
      <Notebook />
      <WinModal />
      <LoseModal />
      <Suggestion />
      <ResetGame />
    </>
  );
};

export default Game;
