import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import Accuse from "./Accuse";
import { SocketContext } from "../context/SocketContext";
import { GameContext } from "../context/GameContext";


const Suggestion = (props) => {
  const { endTurn, active, currentRoom, proofmsg, activeAccuse, waiting, setWaiting, myProof, inactiveProof } = useContext(
    SocketContext
  );
  const {setAccuse, selectedSuspect, selectedRoom, selectedWeapon} = useContext(GameContext);


  const handleEndTurn = () => {
    setWaiting(false)
    endTurn();
  };

  const handleAccuse = () => {
    setAccuse(true);
  };

  return (
    <Modal isOpen={activeAccuse || proofmsg ? true : false}>
      <div>
        <p className="suggestText">
          {proofmsg && active ? proofmsg : proofmsg && myProof ? myProof : proofmsg && inactiveProof ? inactiveProof : "No one could prove your suggestion incorrect. Would you like to accuse?"}
        </p>
        {activeAccuse ? (
          <button onClick={() => handleEndTurn()}> End Turn </button>
        ) : null}
        {!proofmsg ? <button onClick={() => handleAccuse()}> Accuse </button> : null}
        <Accuse />
      </div>
    </Modal>
  );
};

export default Suggestion;
