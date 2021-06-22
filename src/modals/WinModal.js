import Modal from 'react-modal'

const WinModal = (props) => {
    const {win} = props

    return (
        <Modal isOpen={win}>
            <h1> You Won!! </h1>

            <button> Play Again </button>
        </Modal>
    )
}

export default WinModal