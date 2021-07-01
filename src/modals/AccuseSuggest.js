import Modal from "react-modal";
import { useContext } from "react";
import Accuse from "./Accuse";
import Suggestion from "./Suggestion";
import {SocketContext} from "../context/SocketContext"
import Waiting from "./Waiting"
import { GameContext } from "../context/GameContext";


Modal.setAppElement("#root");
const AccuseSuggest = ({ modalOpen, setModalOpen }) => {
  const {sendSuggest, currentRoom, active, activeSA, waiting, setWaiting} = useContext(SocketContext);
  const {setAccuse, selectedWeapon, setSelectedWeapon, 
        selectedSuspect, setSelectedSuspect } = useContext(GameContext);


  const handleAccuse = () => {
    if (currentRoom && selectedWeapon && selectedSuspect) {
    setAccuse(true);
    } else {
      alert('Please select a weapon and suspect!');
    }
  };

  const handleSuggest = () => {
    if (currentRoom && selectedWeapon && selectedSuspect) {
    sendSuggest(currentRoom, selectedWeapon, selectedSuspect);
    setWaiting(true);
    setModalOpen(false);
    } else {
      alert('Please select a weapon and suspect!');
    }
  };


  return (
    <div>
      <Modal isOpen={active && activeSA && modalOpen} className="accuseSuggestModal">
        
        <button className="closeModal" onClick={() => setModalOpen(!modalOpen)}>
          X
        </button>
        <div className='title'><p>Please make a suggestion or accusation.</p></div>
        <div className="modal_display">
          <select
            className="suspectSelect"
            onChange={(e) => setSelectedSuspect(e.target.value)}
          >
            <option value=""> </option>
            <option value="Butler"> Butler </option>
            <option value="Nanny"> Nanny </option>
            <option value="Doctor"> Doctor </option>
            <option value="Nosy-Neighbor"> Nosy-Neighbor </option>
            <option value="Chef"> Chef </option>
            <option value="Baby"> Baby </option>
          </select>

          <select
            className="weaponSelect"
            onChange={(e) => setSelectedWeapon(e.target.value)}
          >
            <option value=""> </option>
            <option value="Poisoned Cocktail"> Poisoned Cocktail </option>
            <option value="Shank"> Shank </option>
            <option value="Coat Hanger"> Coat Hanger </option>
            <option value="Chainsaw"> Chainsaw </option>
            <option value="Blowtorch"> Blowtorch </option>
            <option value="Ninja Star"> Ninja Star </option>
          </select>
        </div>

        <div>
          <Accuse />
          <Suggestion />

          <div className="flexBtns">
            <button className="btnSuggest" onClick={() => handleSuggest()}>
              Suggest
            </button>
            <button className="btnAccuse" onClick={() => handleAccuse()}>
              Accuse
            </button>

          </div>
        </div>
      </Modal>
    <Waiting waiting={waiting} setWaiting={setWaiting}/>
    </div>
  );
};

export default AccuseSuggest;
