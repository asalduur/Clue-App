import Modal from "react-modal";
import { useContext } from "react";
import {SocketContext} from "../context/SocketContext"



const WinModal = (props) => {
  const {winmsg} = useContext(SocketContext)

  const { win } = props;

  return (
    <Modal className="winModal" isOpen={win}>
      <h1 className="winText"> {winmsg} </h1>

      <button className="playAgainBtn"> Play Again </button>
    </Modal>
  );
};

export default WinModal;
