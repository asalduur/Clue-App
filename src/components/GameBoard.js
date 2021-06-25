import Rooms from "./Rooms";

const GameBoard = () => {
  const roomNames = [
    { room: "grotto" },
    { room: "pool-house" },
    { room: "library" },
    { room: "kitchen" },
    { room: "foyer" },
    { room: "wine-cellar" },
    { room: "basement" },
    { room: "garden" },
    { room: "master-bedroom" },
  ];



  return (
    <>
      <div className="gameBoard">
        <div className="flexBoard">
          <Rooms roomNames={roomNames}/>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
