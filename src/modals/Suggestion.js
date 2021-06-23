import { useEffect, useState } from 'react'
import Modal from 'react-modal'

const Suggestion = (props) => {
    const {suggest, setSuggest, selectedSuspect, selectedRoom, selectedWeapon} = props
    const [proof, setProof] = useState('')
    const [show, setShow] = useState(``)
    
    const handleEndTurn = () => {
        setSuggest(false)
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
            <button onclick={handleEndTurn}> end turn </button>
            <button> accuse </button>
            </div>
        </Modal>
    )
}

export default Suggestion