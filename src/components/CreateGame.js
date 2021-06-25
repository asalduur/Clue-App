import Modal from "react-modal";
import Lobby from "./Lobby";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const CreateGame = (props) => {
  const { createGame, setCreateGame, code } = props;
  console.log(createGame);
  const closeModal = (e) => {
    e.stopPropagation();
    setCreateGame(false);
  };
  const handleStartGame = () => {
    // setActiveGame(true)
    // props.history.push('/Game')
    <Link to="/Game"> </Link>;
  };

  return (
    <Modal isOpen={createGame}>
      <button onClick={closeModal}> X </button>

      <h1> Game Code: {code} </h1>
      <h2> Players in Game </h2>
      <div></div>
      <button onClick={handleStartGame}>
        {" "}
        <Link to="/Game"> Start Game </Link>{" "}
      </button>
    </Modal>
  );
};

export default CreateGame;
