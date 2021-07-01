import GameBoard from "./GameBoard";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import Player from "./Player";
import DiceRoll from "./DiceRoll";
import AccuseSuggest from "../modals/AccuseSuggest";
import Suggestion from "../modals/Suggestion";
import Notebook from "./Notebook";
import WinModal from "../modals/WinModal";
import LoseModal from "../modals/LoseModal";
import LastMan from "../modals/LastMan";
import ResetGame from "../modals/ResetGame";
import Rules from "../modals/Rules";
import { useHistory } from 'react-router-dom';

const Game = () => {
  const { roomId, players, player } = useContext(SocketContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);

  const history = useHistory()

  if (!roomId) {
    history.push('/');
  }

  let opponentpieces = [];

  players.filter((p, i) => {
    if (p.id !== player.id) {
      opponentpieces.push(p);
    }
  });

  return roomId ? (
    <>
      <div className="headerBar">
        <h2 className="headerText">Hunch</h2>
      </div>
      <div className='topbar'>
      <div className="suggestAccuseBtns">
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="modalBtnStyling"
        >
          Suggest/Accuse
        </button>
        <AccuseSuggest modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
        <div className='opponentlegend'>
        {opponentpieces.map((o, i) => {
        return (
          <span>
            <p>P {o.player}: </p>
            <div className={`${o.token}Current`} style={{height: '20px', width: '20px', 
          padding: '0', margin: '0, 0', marginTop: '3px', boxShadow: 'none'}}></div>
          </span>
        )
      })}
        </div>
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
          <div className="mobileFlex">
            <DiceRoll />
            <Player />
          </div>
        </div>
      </div>
      <Notebook />
      <Rules
        ruleModalOpen={ruleModalOpen}
        setRuleModalOpen={setRuleModalOpen}
      />
      <WinModal />
      <LoseModal />
      <LastMan/>
      <Suggestion />
      <ResetGame />
    </>
  ) : <div></div>;
};

export default Game;
