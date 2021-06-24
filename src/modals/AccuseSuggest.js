import Modal from "react-modal";
import { useState } from "react";
import Accuse from "./Accuse";
import Suggestion from "./Suggestion";

Modal.setAppElement("#root");
const AccuseSuggest = ({ suggestAccuse, setSuggestAccuse }) => {
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedSuspect, setSelectedSuspect] = useState("");
  const [accuse, setAccuse] = useState(false);
  const [suggest, setSuggest] = useState(false);

  const handleAccuse = () => {
    setAccuse(true);
  };

  const handleSuggest = () => {
    setSuggest(true);
  };

  const handleSetWeapon = (e) => {
    setSelectedWeapon(e.target.value);
  };

  const handleCloseModal = () => {
    setSuggestAccuse(false);
  };

  console.log(selectedWeapon);
  console.log(selectedRoom);
  console.log(selectedSuspect);

  return (
    <div>
      <Modal isOpen={suggestAccuse} className="accuseSuggestModal">
        <button className="closeModal" onClick={handleCloseModal}>
          X
        </button>
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
            className="roomSelect"
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value=""> </option>
            <option value="Grotto"> Grotto </option>
            <option value="Pool-House"> Pool-House </option>
            <option value="Library"> Library </option>
            <option value="Kitchen"> Kitchen </option>
            <option value="Basement"> Basement </option>
            <option value="Wine Cellar"> Wine Cellar </option>
            <option value="Foyer"> Foyer </option>
            <option value="Garden"> Garden </option>
            <option value="Master Bedroom"> Master Bedroom </option>
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
          <Accuse
            accuse={accuse}
            setAccuse={setAccuse}
            selectedSuspect={selectedSuspect}
            selectedRoom={selectedRoom}
            selectedWeapon={selectedWeapon}
            setSuggestAccuse={setSuggestAccuse}
          />
          <Suggestion
            suggest={suggest}
            setSuggest={setSuggest}
            accuse={accuse}
            setAccuse={setAccuse}
            selectedSuspect={selectedSuspect}
            selectedRoom={selectedRoom}
            selectedWeapon={selectedWeapon}
            setSuggestAccuse={setSuggestAccuse}
          />
          <div className="flexBtns">
            <button className="btnSuggest" onClick={handleSuggest}>
              Suggest
            </button>
            <button className="btnAccuse" onClick={handleAccuse}>
              Accuse
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccuseSuggest;
