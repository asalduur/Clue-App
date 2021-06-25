import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

const Rooms = ({ roomNames}) => {
  const {
    currentRoom,
    setCurrentRoom,
    active,
    activeRoom,
    sendRoom,
    player
  } = useContext(SocketContext);

  const changeRoom = (room) => {
    if (active && activeRoom) {
      setCurrentRoom(room);
      sendRoom(room);
    }
  };

  
  return (
    <>
      {roomNames.map((room, index) => {
        return (
          <div
            key={index}
            className={`${room.room}Background`}
            onClick={() => changeRoom(room.room)}
          >
            <div className="flexTokens">
              {currentRoom === room.room ? (
                <div className={`${player.token}Current`}></div>
              ) : (
                <div className="filler"></div>
              )}
            </div>
            <h2 className="roomName">{room.room.toUpperCase()}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Rooms;
