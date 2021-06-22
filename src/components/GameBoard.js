import Rooms from "./Rooms";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

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

  const { fakeplayer } = useContext(SocketContext);

  return (
    <>
      <div className="gameBoard">
        <div className="flexBoard">
          <Rooms roomNames={roomNames} player={fakeplayer} />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
