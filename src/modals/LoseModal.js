import Modal from "react-modal";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const LoseModal = (props) => {
  const { lossmsg } = useContext(SocketContext);

  return (
    <Modal isOpen={lossmsg ? true : false} className="loseModal">
      <h1 className="loseText"> {lossmsg} </h1>
    </Modal>
  );
};

export default LoseModal;
