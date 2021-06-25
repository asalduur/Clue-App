import Modal from "react-modal";

Modal.setAppElement("#root");

const JoinGame = (props) => {
  const {
    joinGame,
    setJoinGame,
    code,
    codeInput,
    setCodeInput,
    setCreateGame,
  } = props;

  const handleJoin = () => {
    if (+codeInput === code) {
      setCreateGame(true);
      setJoinGame(false);
    }
  };

  return (
    <Modal isOpen={joinGame} onRequestClose={() => setJoinGame(false)}>
      <input
        placeholder="Enter Code"
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
      />
      <button onClick={handleJoin}> Join </button>
    </Modal>
  );
};

export default JoinGame;
