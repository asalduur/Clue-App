import { useContext } from "react";
import Modal from "react-modal";
import { SocketContext } from "../context/SocketContext";

const ResetGame = () => {
  const { resetmsg } = useContext(SocketContext);

  return (
    <Modal isOpen={resetmsg ? true : false} className="">
      <h1 className=""> {resetmsg} </h1>
    </Modal>
  );
};

export default ResetGame;