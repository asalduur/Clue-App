import {useState} from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const Lobby = () => {
    const [activeGame, setActiveGame] = useState(false)
    const [createGame, setCreateGame] = useState(false)
    const [joinGame, setJoinGame] = useState(false)
    const [codeInput, setCodeInput] = useState('')
    const [code, setCode] = useState('')


    const handleCreateGame = () => {
        setCreateGame(true)
        handleCreateCode()
    }

    const handleJoinGame = () => {
        setJoinGame(true)
        console.log(code)
    }

    const handleStartGame = (props) => {
        setActiveGame(true)
        props.history.push('/Game')
    }

    const handleCreateCode = () => {
        setCode(Math.floor(Math.random() * (1000000 - 100000 +1) + 100000))
    }

    const handleJoin = () => {
        if (+codeInput === code) {
            setCreateGame(true)
            setJoinGame(false)
        }
    }

 

    return(
    <div className="lobby">
        <h1> Hunch </h1>

        <button onClick={handleCreateGame}> Create Game </button>
        <button onClick={handleJoinGame}> Join Game </button>
        {/* <button onClick={handleCreateCode}> Create Code </button> */}
        

        <Modal isOpen={joinGame} onRequestClose={() => setJoinGame(false)}>
        <input placeholder="Enter Code" value={codeInput} onChange={(e) => setCodeInput(e.target.value)}/>
        <button onClick={handleJoin}> Join </button>
        </Modal>


        <Modal isOpen={createGame} onRequestClose={() => setCreateGame(false)}>
        <h1> Game Code: {code} </h1>
        <h2> Players in Game </h2>
        <div>
            
        </div>
        <div>

        </div>
        <button onClick={handleStartGame}> Start Game </button>
        </Modal>
    </div>
    )
}

export default Lobby