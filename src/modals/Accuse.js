import { useContext } from "react";
import Modal from "react-modal";
import WinModal from "./WinModal";
import {SocketContext} from "../context/SocketContext"
import { GameContext } from "../context/GameContext";

const Accuse = (props) => {

  const {currentRoom, sendAccusation, active, activeSA, activeAccuse} = useContext(SocketContext)
  const {accuse, setAccuse, selectedSuspect, selectedWeapon,} = useContext(GameContext);

  const handleBack = () => {
    setAccuse(false);
  };

  const handleConfirm = () => {
    if ((active && activeSA) || (active && activeAccuse)) {
      sendAccusation(currentRoom, selectedWeapon, selectedSuspect)
    }
    setAccuse(false);
  };

  return (
    <div>
      <Modal isOpen={accuse} className="accuseModal">
        <h1 className="accuseText"> If you accuse wrong you lose! </h1>
        <h2 className="accusationText">
          {" "}
          Are you sure you want to accuse{" "}
          <span className="selectedText">{selectedSuspect}</span> in the{" "}
          <span className="selectedText">{currentRoom}</span> with the{" "}
          <span className="selectedText">{selectedWeapon}</span>.
        </h2>
        <div className="flexBtns">
          <button className="backBtn" onClick={() => handleBack()}>
            Back
          </button>
          <button className="confirmBtn" onClick={() => handleConfirm()}>
            Confirm
          </button>
        </div>

        <WinModal />
      </Modal>

    </div>
  );
};

export default Accuse;
