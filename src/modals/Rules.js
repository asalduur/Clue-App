import Modal from "react-modal";

const Rules = () => {
  const closeModal = () => {
    // setRules(false);
  };
  return (
    <>
      <Modal isOpen={true} className="ruleModal" preventScroll={false}>
        <button className="closeModal" onClick={closeModal}>
          X
        </button>
        <h2 className="largeText">Object of The Game</h2>
        <ul>
          <li className="listText">
            Mr. Boddy is found dead in one of the rooms in his mansion - it is
            your job to find who did it, with what, and where.
          </li>
        </ul>
        <h2 className="largeText">Game Play</h2>
        <ul>
          <li className="listText">
            Roll a dice and once you reach a total of 20 points, you will be
            prompted to move to a room.
          </li>
        </ul>
        <h3 className="subheader">Suggesting</h3>
        <ul>
          <li className="listText">
            Once in a room, you can make a suggestion by naming a suspect,
            murder weapon and the room you just entered.
          </li>
          <li className="listText">
            One other player will show evidence if possible to prove your
            suggestion false (done by computer).
          </li>
        </ul>
        <h3 className="subheader">Accusing</h3>
        <ul>
          <li className="listText">
            You can only make one accusation per game to either win or lose. If
            accusation is false you are kicked out of game.
          </li>
        </ul>
        <h3 className="subheader">Notebook</h3>
        <ul>
          <li className="listText">
            Use notebook to check off suspects, rooms, and weapons in your hand
            or those revealed during a suggestion.
          </li>
        </ul>
      </Modal>
      ;
    </>
  );
};

export default Rules;
