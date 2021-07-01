import { useContext } from "react";
import Modal from "react-modal";
import Accuse from "./Accuse";
import { SocketContext } from "../context/SocketContext";
import { GameContext } from "../context/GameContext";


const Suggestion = (props) => {
  const { endTurn, active, proofmsg, activeAccuse, setWaiting, myProof, inactiveProof } = useContext(
    SocketContext
  );
  const {setAccuse} = useContext(GameContext);


  const handleEndTurn = () => {
    setWaiting(false)
    endTurn();
  };

  const handleAccuse = () => {
    setAccuse(true);
  };

  return (
    <Modal isOpen={activeAccuse || proofmsg ? true : false} className="suggestModal">
      <div>
        <p className="suggestText">
          {proofmsg && active ? proofmsg : proofmsg && myProof ? myProof : proofmsg && inactiveProof ? inactiveProof : "No one could prove your suggestion incorrect. Would you like to accuse?"}
        </p>
        <div className="flexBtns">
          {activeAccuse ? (
            <button className="btnEndTurn" onClick={() => handleEndTurn()}> End Turn </button>
            ) : null}
          {!proofmsg ? <button className="btnAccuse" onClick={() => handleAccuse()}> Accuse </button> : null}
        </div>
        <Accuse />
      </div>
    </Modal>
  );
};

export default Suggestion;
