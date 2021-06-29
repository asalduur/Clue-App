import { useContext } from "react";
import Modal from "react-modal";
import { SocketContext } from "../context/SocketContext";

const ResetGame = () => {
  const { resetmsg } = useContext(SocketContext);

  return (
    <Modal isOpen={resetmsg ? true : false} className="resetModal">
      <h1 className="resetText"> {resetmsg} </h1>
    </Modal>
  );
};

export default ResetGame;