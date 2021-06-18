import Rooms from "./Rooms";

const GameBoard = () => {
  const roomColors = [
    "blue",
    "red",
    "green",
    "purple",
    "home",
    "yellow",
    "orange",
  ];
  return (
    <>
      <div className="gameBoard">
        <div className="flexBoard">
          <Rooms roomColors={roomColors} />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
