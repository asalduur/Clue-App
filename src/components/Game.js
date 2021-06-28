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
import ResetGame from "../modals/ResetGame";
import Rules from "../modals/Rules";

const Game = () => {
  // const { playerwin, playerlost, active, activeAccuse, activeSA, proofmsg } = useContext(SocketContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);

  return (
    <>
      <div className="headerBar">
        <h2 className="headerText">Hunch</h2>
      </div>
      <div className="suggestAccuseBtns">
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="modalBtnStyling"
        >
          Suggest/Accuse
        </button>
        <AccuseSuggest modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
      <div className="flexGameboard">
        <GameBoard modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <div className="sideBar">
          <button
            className="ruleBtn"
            onClick={() => setRuleModalOpen(!ruleModalOpen)}
          >
            Rules
          </button>
          <DiceRoll />
          <Player />
        </div>
      </div>
      <Notebook />
      <Rules
        ruleModalOpen={ruleModalOpen}
        setRuleModalOpen={setRuleModalOpen}
      />
      <WinModal />
      <LoseModal />
      <Suggestion />
      <ResetGame />
    </>
  );
};

export default Game;
