import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

const Rooms = ({ roomNames, modalOpen, setModalOpen}) => {
  const {
    currentRoom,
    setCurrentRoom,
    active,
    activeRoom,
    sendRoom,
    player, 
    players
  } = useContext(SocketContext);

  const changeRoom = (room) => {
    if (active && activeRoom) {
      setCurrentRoom(room);
      sendRoom(room);
      setModalOpen(true);
    }
  };

  let opponentpieces = [];

  players.forEach((p, i) => {
    if (p.id !== player.id) {
      opponentpieces.push(p);
    }
  })

  console.log("opponentpieces:", opponentpieces)

  console.log('ROOMPLAYERS:', players);

  
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
            <div className="flexTokens">
              {opponentpieces.map((o, i) => {
                if (o.location === room.room) {
                  return (
                    <div>
                      {o.token}
                    </div>
                  )
                }
              })}
            </div>
            <h2 className="roomName">{room.room.toUpperCase()}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Rooms;
