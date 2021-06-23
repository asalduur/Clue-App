import Modal from "react-modal";

const WinModal = (props) => {
  const { win } = props;

  return (
    <Modal className="winModal" isOpen={win}>
      <h1 className="winText"> You Won!! </h1>

      <button className="playAgainBtn"> Play Again </button>
    </Modal>
  );
};

export default WinModal;
