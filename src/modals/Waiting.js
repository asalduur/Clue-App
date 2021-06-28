import { useContext, useEffect } from "react";
import Modal from "react-modal";
import { SocketContext } from "../context/SocketContext";

const Waiting = () => {
  const { proofmsg, waiting, setWaiting, activeAccuse, active, activeSA } = useContext(SocketContext);

  return (
    <Modal isOpen={active, waiting} className="waitingModal">
      <h1 className="waitingText"> Waiting for players to show proof </h1>
    </Modal>
  );
};

export default Waiting;
