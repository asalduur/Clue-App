import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const GameStart = () => {
  const {
    gameStart,
    gameRooms,
    joinRoom,
    roomId,
  } = useContext(SocketContext);

  const gamerooms = gameRooms
    ? gameRooms.map((room, i) => {
        return (
          <div key={i} className="roomOption">
            <p className="roomNumText">Room {room.roomNum}</p>
            <p className="playerText">players: {room.roomPlayers.length}</p>
            {room.active === true ? (
              <p>GAME IN PROGRESS</p>
            ) : room.roomPlayers.length >= 3 && roomId === room.roomId ? (
              <button onClick={() => gameStart()} className="startGameBtn">
                START GAME
              </button>
            ) : room.roomPlayers.length < 6 && roomId !== room.roomId ? (
              <button
                onClick={() => joinRoom(room.roomId)}
                className="joinGameBtn"
              >
                JOIN ROOM
              </button>
            ) : room.roomPlayers.length >= 6 && roomId !== room.roomId ? (
              <p className="gameFullText">GAME FULL</p>
            ) : null}
          </div>
        );
      })
    : null;

  return (
    <div className="lobby">
      <h2 className="headerText">Hunch</h2>
      <div className="gameroomslist">{gamerooms}</div>
    </div>
  );
};

export default GameStart;
