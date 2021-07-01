import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Hand = () => {
  const { player } = useContext(SocketContext);
  let weaponArr = [];
  let suspectArr = [];
  let roomArr = [];
  for (let i = 0; i < player.cards.length; i++) {
    if (player.cards[i].weapon) {
      weaponArr.push(player.cards[i].weapon);
    } else if (player.cards[i].room) {
      roomArr.push(player.cards[i].room);
    } else {
      suspectArr.push(player.cards[i].suspect);
    }
  }

  return (
    <div className='handBox'>
      <h2 className="handText">Your Hand</h2>
      <h2 className="typeTitle">Weapons</h2>
      {weaponArr.length > 0 ? (
        <div>
          {weaponArr.map((weapon, index) => {
            return (
              <p key={index} className="cards">
                {weapon}
              </p>
            );
          })}
        </div>
      ) : (
        <p className="noCards">No cards</p>
      )}
      <h2 className="typeTitle">Suspects</h2>
      {suspectArr.length > 0 ? (
        <div>
          {suspectArr.map((suspect, index) => {
            return (
              <p key={index} className="cards">
                {suspect}
              </p>
            );
          })}
        </div>
      ) : (
        <p className="noCards">No cards</p>
      )}
      <h2 className="typeTitle">Rooms</h2>
      {roomArr.length > 0 ? (
        <div>
          {roomArr.map((room, index) => {
            return (
              <p key={index} className="cards">
                {room}
              </p>
            );
          })}
        </div>
      ) : (
        <p className="noCards">No cards</p>
      )}
    </div>
  );
};

export default Hand;