import {useContext, useEffect} from 'react';
import {SocketContext} from '../context/SocketContext';

const Player = ({ playerInfo }) => {

  
  const {player, activeRoll, getPlayer, inactiveMsg, activeRoom, active} = useContext(SocketContext);


  console.log(playerInfo);
  return (
    <>
      <div>
        <h2 className="playerName">{player ? player.player : null}</h2>
        {player ? <div className={`${player.token}Token`}></div> : null}
        {!active ? <p>{inactiveMsg}</p> : null}
        {activeRoll ? <p>{`You are the active player. It's your turn to roll`}</p> : null}
        {activeRoom ? <p>{`You've rolled more than 20 points! Please choose a room!`}</p> : null}
      </div>
    </>
  );
};

export default Player;
