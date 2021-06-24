import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

const Rooms = ({ roomNames, player }) => {
  const {
    currentRoom,
    setCurrentRoom,
    active,
    activeRoom,
    sendRoom,
  } = useContext(SocketContext);
  console.log(player);

  const changeRoom = (room) => {
    console.log(room);
    // Will be using below code to allow for only active user to select room and not allow it all the time.
    // if (active && activeRoom) {
    //   setCurrentRoom(room);
    //   sendRoom(room);
    // }
    setCurrentRoom(room);
  };
  console.log("current room: ", currentRoom);
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
