import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [selectedWeapon, setSelectedWeapon] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSuspect, setSelectedSuspect] = useState("");

    return (
        <GameContext.Provider
        value={{
            selectedWeapon,
            selectedRoom,
            selectedSuspect,
            setSelectedWeapon,
            setSelectedRoom,
            setSelectedSuspect
        }}>
        </GameContext.Provider>
    )
}