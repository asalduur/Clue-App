import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Hand = () => {
  const { player } = useContext(SocketContext);
  const cardType = ["Weapons", "Suspects", "room"];
  return (
    <div>
      <h2 className="handText">Your Hand</h2>
      <h2 className="typeTitle">Weapons</h2>
      {player.cards.map((weapon, index) => {
        return (
          <p key={index} className="cards">
            {weapon.weapon}
          </p>
        );
      })}
      <h2 className="typeTitle">Suspects</h2>
      {player.cards.map((suspect, index) => {
        return (
          <p key={index} className="cards">
            {suspect.suspect}
          </p>
        );
      })}
      <h2 className="typeTitle">Rooms</h2>
      {player.cards.map((room, index) => {
        return (
          <p key={index} className="cards">
            {room.room}
          </p>
        );
      })}
    </div>
  );
};

export default Hand;
