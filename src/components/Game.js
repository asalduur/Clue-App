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
      <div className='topbar' style={{display: 'flex', width: '100vw', justifyContent: 'center'}}>
      <div className="suggestAccuseBtns" style={{flex: '1', display: 'flex', justifyContent: 'flex-start', marginLeft: '3.3%', height: '30px'}}>
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="modalBtnStyling"
        >
          Suggest/Accuse
        </button>
        <AccuseSuggest modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
        <div className='opponentlegend' style={{display: 'flex', flex: '3', justifyContent: 'flex-end', marginRight: '21%', height: '30px'}}>
        {opponentpieces.map((o, i) => {
        return (
          <span style={{display: 'flex', justifyContent: 'space-between', 
          marginLeft: '10px', marginRight: '10px'}}>
            <p>Player {o.player}: </p>
            <p>{o.token}</p>
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
      <Suggestion />
      <ResetGame />
    </>
  ) : <div></div>;
};

export default Game;
