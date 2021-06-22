import Modal from 'react-modal'

const LoseModal = (props) => {
    const {lose, setLose, accuse, setAccuse} = props

    const handleWatch = () => {
        setLose(false)
        setAccuse(false)
        // setActive(false)
    }

    return (
        <Modal isOpen={lose}>
            <h1> You Lost!! </h1>

            <button onClick={handleWatch}> Continue Watching </button>
            <button> Leave Game </button>
        </Modal>
    )
}

export default LoseModal