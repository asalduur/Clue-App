import GameBoard from "./GameBoard";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Player from "./Player";

//import rooms, weapons, and people from sockets here

const Game = () => {
  const { fakeplayer } = useContext(SocketContext);

  useEffect(() => {}, []);
  return (
    <>
      <h2 className="headerText">Hunch</h2>
      <div className="flexGameboard">
        <GameBoard />
        <Player playerInfo={fakeplayer} />
      </div>
    </>
  );
};

export default Game;
