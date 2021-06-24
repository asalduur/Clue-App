import Modal from 'react-modal'
import {useContext} from 'react'
import SocketContext from '../context/SocketContext'

const OtherPlayerMove = () => {
    const {active, inactiveMsg} = useContext(SocketContext)

    return (
        <Modal isOpen={!active}>
            <div>
            {inactiveMsg}
            </div>
        </Modal>
    )
}

export default OtherPlayerMove