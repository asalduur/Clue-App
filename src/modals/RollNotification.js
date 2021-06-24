import Modal from "react-modal";
import {useContext, useState, useEffect} from 'react';
import {SocketContext} from '../context/SocketContext';

const RollNotification = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const {active, activeRoll} = useContext(SocketContext);

  useEffect(() => {
    if (active && activeRoll) {
      setModalOpen(true)
    } else {
      setModalOpen(false)
    }
  }, [active, activeRoll])


  return (
    <Modal isOpen={modalOpen} className="rollnotification">
      <h1 className="loseText">It's your turn. Please roll the dice!</h1>
      <div className="flexBtns">
        <button className="continueBtn" onClick={() => setModalOpen(false)}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default RollNotification;