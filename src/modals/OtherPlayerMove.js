import Modal from 'react-modal'

const OtherPlayerMove = () => {


    return (
        <Modal isOpen={!active}>
            <div>
            {inactiveMsg}
            </div>
        </Modal>
    )
}

export default OtherPlayerMove