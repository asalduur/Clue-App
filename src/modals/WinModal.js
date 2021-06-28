import Modal from "react-modal";
import { useContext } from "react";
import {SocketContext} from "../context/SocketContext"



const WinModal = (props) => {
  const {winmsg} = useContext(SocketContext)

  return (
    <Modal className="winModal" isOpen={winmsg ? true : false}>
      <h1 className="winText"> {winmsg} </h1>
    </Modal>
  );
};

export default WinModal;
