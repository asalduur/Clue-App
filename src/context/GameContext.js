import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [accuse, setAccuse] = useState(false);
    const [selectedWeapon, setSelectedWeapon] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSuspect, setSelectedSuspect] = useState("");

    return (
        <GameContext.Provider
        value={{
            accuse,
            setAccuse,
            setSelectedSuspect,
            setSelectedWeapon,
            selectedSuspect,
            selectedWeapon,
            selectedRoom,
            setSelectedRoom
        }}>
            {props.children}
        </GameContext.Provider>
    )
}