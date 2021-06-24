import {useContext, useEffect} from 'react';
import {SocketContext} from '../context/SocketContext';

const Player = ({ playerInfo }) => {

  
  const {player, activeRoll, getPlayer, inactiveMsg} = useContext(SocketContext);


  console.log(playerInfo);
  return (
    <>
      <div>
        <h2 className="playerName">{player ? player.player : null}</h2>
        {player ? <div className={`${player.token}Token`}></div> : null}
        {activeRoll ? <p>{`You are the active player. It's your turn to roll`}</p> : <p>{inactiveMsg}</p>}
      </div>
    </>
  );
};

export default Player;
