import Modal from "react-modal";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const LoseModal = (props) => {
  const { lossmsg, playerlost } = useContext(SocketContext);
  const { lose, setLose, accuse, setAccuse, setSuggestAccuse } = props;

  const handleWatch = () => {
    setLose(false);
    setAccuse(false);
    setSuggestAccuse(false);
  };

  return (
    <Modal isOpen={lossmsg ? true : false} className="loseModal">
      <h1 className="loseText"> {lossmsg} </h1>
      <div className="flexBtns">
        <button className="continueBtn" onClick={handleWatch}>
          Continue Watching
        </button>
        <button className="leaveBtn"> Leave Game </button>
      </div>
    </Modal>
  );
};

export default LoseModal;
