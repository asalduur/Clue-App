const Player = ({ playerInfo }) => {
  console.log(playerInfo);
  return (
    <>
      <div>
        <h2 className="playerName">{playerInfo.player}</h2>
        <div className={`${playerInfo.token}Token`}></div>
      </div>
    </>
  );
};

export default Player;
