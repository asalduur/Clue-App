import Modal from 'react-modal'
import Lobby from './Lobby'

Modal.setAppElement('#root')

const CreateGame = (props) => {
    const {createGame, setCreateGame, code} = props
    console.log(createGame)
    const closeModal = (e) => {
        e.stopPropagation()
        console.log('Hello')
        setCreateGame(false)
    }
    const handleStartGame = () => {
        // setActiveGame(true)
        props.history.push('/Game')
    }

    return (
        <Modal isOpen={createGame} >
            <button onClick={closeModal}> X </button>

            <h1> Game Code: {code} </h1>
            <h2> Players in Game </h2>
            <div>
            </div>
            <button onClick={handleStartGame}> Start Game </button>
        </Modal>
    )
}

export default CreateGame