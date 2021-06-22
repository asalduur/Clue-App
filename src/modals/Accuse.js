import { useState } from 'react'
import Modal from 'react-modal'

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

        </Modal>

        <Modal isOpen={win}>
            <h1> You Won!! </h1>
        </Modal>

        <Modal isOpen={lose}>
            <h1> You Lost!! </h1>
        </Modal>
        </div>
    )
}

export default Accuse