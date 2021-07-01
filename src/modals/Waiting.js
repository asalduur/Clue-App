import { useContext } from "react";
import Modal from "react-modal";
import { SocketContext } from "../context/SocketContext";

const Waiting = () => {
  const { waiting, active } = useContext(SocketContext);

  return (
    <Modal isOpen={active && waiting ? true : false} className="waitingModal">
      <h1 className="waitingText"> Waiting for players to show proof </h1>
    </Modal>
  );
};

export default Waiting;
