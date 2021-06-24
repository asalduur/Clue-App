import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Accuse from './Accuse'

const Suggestion = (props) => {
    const {suggest, setSuggest, accuse, setAccuse, selectedSuspect, selectedRoom, selectedWeapon, setSuggestAccuse} = props
    const [show, setShow] = useState(``)

    const proof = ''
    
    const handleEndTurn = () => {
        setSuggest(false)
        // setActive(false)
    }

    const handleAccuse = () => {
        setAccuse(true)
    }
    
    useEffect(() => {
            if (proof === '') {
                setShow(`Your suggestion of ${selectedSuspect}, ${selectedRoom}, and ${selectedWeapon} could not be proved false`)
            }
    
            else {
                setShow(`Your suggestion of ${selectedSuspect}, ${selectedRoom}, and ${selectedWeapon} could be proved false with ${proof}`)
            }
        }, [selectedSuspect, selectedRoom, selectedWeapon])

    return (
        <Modal isOpen={suggest}>
            {show}

            <div>
            <Accuse accuse={accuse} setAccuse={setAccuse} selectedSuspect={selectedSuspect} selectedRoom={selectedRoom} selectedWeapon={selectedWeapon} setSuggestAccuse={setSuggestAccuse}/>
            <button onClick={handleEndTurn}> End Turn </button>
            <button onClick={handleAccuse}> Accuse </button>
           
            
            </div>
        </Modal>
    )
}

export default Suggestion