import { useState } from 'react'
import Modal from 'react-modal'
import WinModal from './WinModal'
import LoseModal  from './LoseModal'

const Accuse = (props) => {
    const {accuse, setAccuse, selectedSuspect, selectedRoom, selectedWeapon} = props
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const realSuspect = 'Butler'
    const realRoom = 'Grotto'
    const realWeapon = 'IcePick'

    const handleBack = () => {
        setAccuse(false)
    }

    const handleConfirm = () => {
        if (selectedSuspect === realSuspect && selectedRoom === realRoom && selectedWeapon === realWeapon) {
            setWin(true)
        }
        else {
            setLose(true)
        }
    }

    return (
        <div>
            <Modal isOpen={accuse}>
            <h1> If you accuse wrong you lose! </h1>
            <h2> Are you sure you want to accuse {selectedSuspect} in the {selectedRoom} with the {selectedWeapon} </h2>

            <button onClick={handleBack}> Back </button>
            <button onClick={handleConfirm}> Confirm </button>

            <WinModal win={win}/>
            <LoseModal lose={lose} setLose={setLose} accuse={accuse} setAccuse={setAccuse}/>
            </Modal>
        </div>
    )
}

export default Accuse