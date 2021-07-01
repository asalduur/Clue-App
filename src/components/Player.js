import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Player = ({ playerInfo }) => {
  const {
    player,
    activeRoll,
    lossmsg,
    inactiveMsg,
    activeRoom,
    active,
  } = useContext(SocketContext);

  return (
    <>
      <div className="playerInfo">
        <h2 className="playerName">
          {player ? `Player ${player.player}` : null}
        </h2>
        {player ? <div className={`${player.token}Token`}></div> : null}
        {!active ? <p className="infoText">{inactiveMsg}</p> : null}
        {activeRoll ? (
          <p className="infoText">{`You are the active player. It's your turn to roll`}</p>
        ) : null}
        {activeRoom ? (
          <p className="infoText">{`You've rolled more than 20 points! Please choose a room!`}</p>
        ) : null}
        {lossmsg ? <p>{lossmsg}</p> : null}
      </div>
    </>
  );
};

export default Player;
