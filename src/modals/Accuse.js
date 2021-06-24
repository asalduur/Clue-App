import { useState } from "react";
import Modal from "react-modal";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";

const Accuse = (props) => {
  const {
    accuse,
    setAccuse,
    selectedSuspect,
    selectedRoom,
    selectedWeapon,
    setSuggestAccuse,
  } = props;
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const realSuspect = "Butler";
  const realRoom = "Grotto";
  const realWeapon = "IcePick";

  const handleBack = () => {
    setAccuse(false);
  };

  const handleConfirm = () => {
    if (
      selectedSuspect === realSuspect &&
      selectedRoom === realRoom &&
      selectedWeapon === realWeapon
    ) {
      setWin(true);
    } else {
      setLose(true);
    }
  };

  return (
    <div>
      <Modal isOpen={accuse} className="accuseModal">
        <h1 className="accuseText"> If you accuse wrong you lose! </h1>
        <h2 className="accusationText">
          {" "}
          Are you sure you want to accuse{" "}
          <span className="selectedText">{selectedSuspect}</span> in the{" "}
          <span className="selectedText">{selectedRoom}</span> with the{" "}
          <span className="selectedText">{selectedWeapon}</span>.
        </h2>
        <div className="flexBtns">
          <button className="backBtn" onClick={handleBack}>
            Back
          </button>
          <button className="confirmBtn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>

        <WinModal win={win} />
        <LoseModal
          lose={lose}
          setLose={setLose}
          accuse={accuse}
          setAccuse={setAccuse}
          setSuggestAccuse={setSuggestAccuse}
        />
      </Modal>
    </div>
  );
};

export default Accuse;
