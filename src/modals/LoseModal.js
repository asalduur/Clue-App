import Modal from "react-modal";

const LoseModal = (props) => {
  const { lose, setLose, accuse, setAccuse, setSuggestAccuse } = props;

  const handleWatch = () => {
    setLose(false);
    setAccuse(false);
    setSuggestAccuse(false)
    // setActive(false)
  };

  return (
    <Modal isOpen={lose} className="loseModal">
      <h1 className="loseText"> You Lost!! </h1>
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
