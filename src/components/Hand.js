import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Hand = () => {
  const { player } = useContext(SocketContext);
  // const cardType = ["Weapons", "Suspects", "room"];
  return (
    <div>
      <h2 className="handText">Your Hand</h2>
      <h2 className="typeTitle">Weapons</h2>
      {player.cards.map((card, index) => {
        if (card.weapon) {
          return (
            <p key={index} className="cards">
              {card.weapon}
            </p>
          );
        };
      })}
      <h2 className="typeTitle">Suspects</h2>
      {player.cards.map((card, index) => {
        if (card.suspect) {
          return (
            <p key={index} className="cards">
              {card.suspect}
            </p>
          );
        };
      })}
      <h2 className="typeTitle">Rooms</h2>
      {player.cards.map((card, index) => {
        if (card.room) {
          return (
            <p key={index} className="cards">
              {card.room}
            </p>
          );
        };
      })}
    </div>
  );
};

export default Hand;
