import {useState} from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const Lobby = () => {
    const [createGame, setCreateGame] = useState(false)

    const handleCreateGame = () => {
        setCreateGame(true)
    }

    const handleStartGame = (props) => {
        props.history.push('/Game')
    }


    return(
    <div className="lobby">
        <h1> Hunch </h1>

        <button onClick={handleCreateGame}> Create Game </button>
        <button> Join Game </button>

        <Modal isOpen={createGame} onRequestClose={() => setCreateGame(false)}>
        <h1> Game Code: </h1>
        <h2> Waiting For Players </h2>
        <div>

        </div>
        <button onClick={handleStartGame}> Start Game </button>
        </Modal>
    </div>
    )
}

export default Lobby