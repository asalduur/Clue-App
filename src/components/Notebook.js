import { useState } from "react";
import Hand from "./Hand";

const Notebook = () => {
  const [showNotebook, setShowNotebook] = useState(false);
  const suspects = [
    "Butler",
    "Nanny",
    "Doctor",
    "Nosy-Neighbor",
    "Chef",
    "Baby",
  ];
  const weapons = [
    "Poisoned Cocktail",
    "Shank",
    "Coat Hanger",
    "Chainsaw",
    "Blowtorch",
    "Ninja Star",
  ];
  const rooms = [
    "Grotto",
    "Pool-house",
    "Library",
    "Kitchen",
    "Foyer",
    "Wine-cellar",
    "Basement",
    "Garden",
    "Master-bedroom",
  ];
  const toggleNotebook = () => setShowNotebook(!showNotebook);

  return (
    <footer>
      {!showNotebook ? (
        <button className="notebtn" onClick={toggleNotebook}>
          Open Notebook
        </button>
      ) : (
        <button className="notebtn" onClick={toggleNotebook}>
          Close Notebook
        </button>
      )}

      <div className="notebook-container">
        <div className={`openNotebook ${showNotebook ? "" : "close"}`}>
          <table className="suspects">
            <thead>
              <tr>
                <th>Suspects</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {suspects.map((suspect, id) => {
                return (
                  <tr key={id}>
                    <td>{suspect}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="weapons">
            <thead>
              <tr>
                <th>Weapons</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((weapon, id) => {
                return (
                  <tr key={id}>
                    <td>{weapon}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="locations">
            <thead>
              <tr>
                <th>Locations</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, id) => {
                return (
                  <tr key={id}>
                    <td>{room}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Hand />
        </div>
      </div>
    </footer>
  );
};

export default Notebook;
