import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';



const GameStart = () => {

  const history = useHistory();
  const {player, players, gameStart} = useContext(SocketContext);


  console.log('FRONT-END PLAYERS:', players);
  console.log('FRONT-END PLAYER:', player);
  return (

    <div className="playerlist">
      <div className="opponents">
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
      </div>
    </div>

  )
}

export default GameStart;