import Rooms from "./Rooms";

const GameBoard = ({modalOpen, setModalOpen}) => {
  const roomNames = [
    { room: "Grotto" },
    { room: "Pool-House" },
    { room: "Library" },
    { room: "Kitchen" },
    { room: "Foyer" },
    { room: "Wine-Cellar" },
    { room: "Basement" },
    { room: "Garden" },
    { room: "Master-Bedroom" },
  ];



  return (
    <>
      <div className="gameBoard">
        <div className="flexBoard">
          <Rooms modalOpen={modalOpen} setModalOpen={setModalOpen} roomNames={roomNames}/>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
