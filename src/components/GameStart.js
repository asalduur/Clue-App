import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';



const GameStart = () => {


  const history = useHistory();
  const {player, players, gameStart, gameRooms, joinRoom, roomId} = useContext(SocketContext);

  const gamerooms = gameRooms ? gameRooms.map((room, i) => {
    return (
      <div key={i}>
        <p>Hunch Room {room.roomNum} --> players: {room.roomPlayers.length}</p>
        {room.active === true ? <p>GAME IN PROGRESS</p> : room.roomPlayers.length >= 3 && roomId === room.roomId ? <button onClick={() => gameStart()}>START GAME</button> : room.roomPlayers.length < 6 && roomId !== room.roomId ? <button onClick={() => joinRoom(room.roomId)}>JOIN ROOM</button> : room.roomPlayers.length >= 6 && roomId !== room.roomId ? 
        <p>GAME FULL</p> : null }
        
      </div>
    )
  }) : null;


  return (

    <div className="lobby">
      <div className="gameroomslist">
        {gamerooms}
      </div>
    </div>

  )
}

export default GameStart;