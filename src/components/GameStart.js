import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';



const GameStart = () => {


  const history = useHistory();
  const {player, players, gameStart, gameRooms, joinRoom, roomId} = useContext(SocketContext);


  return (

    <div className="playerlist">
      {/* <div className="opponents">
        {players && player ? (players.map((p, i) => {
          if (p.id !== player.id) {
            return (
              <div><p>{`${p.player} connected and ready.`}</p></div>
            )
          }
        })) : null}
      </div>
      <div className="myplayer">{player ? <p>{`I'm connected as player ${player.player}`}</p> : null}</div>
      <div className="startbutton">
        {players.length >= 3 ? <button onClick={() => gameStart()}>Start Game</button> : null}
      </div> */}
      {gameRooms ? gameRooms.map((room, i) => {
        return (
          <div>
            <p>Hunch Room {room.roomNum} --> players: {room.roomPlayers.length}</p>
            {room.active === true ? <p>GAME IN PROGRESS</p> : room.roomPlayers.length >= 3 && roomId === room.roomId ? <button onClick={() => gameStart()}>START GAME</button> : room.roomPlayers.length < 6 && roomId !== room.roomId ? <button onClick={() => joinRoom(room.roomId)}>JOIN ROOM</button> : room.roomPlayers.length >= 6 && roomId !== room.roomId ? 
            <p>GAME FULL</p> : null }
            
          </div>
        )
      }) : null}
    </div>

  )
}

export default GameStart;