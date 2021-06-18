import {useState} from 'react'
import Modal from 'react-modal'
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'

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

    const handleCreateCode = () => {
        setCode(Math.floor(Math.random() * (1000000 - 100000 +1) + 100000))
    }

    return(
    <div className="lobby">
        <h1> Hunch </h1>

            <CreateGame createGame={createGame} setCreateGame={setCreateGame} code={code} />
        <button onClick = {handleCreateGame}>
            Create Game
        </button>


            <JoinGame joinGame={joinGame} setJoinGame={setJoinGame} code={code} codeInput={codeInput} setCodeInput={setCodeInput} setCreateGame={setCreateGame}/>
        <button onClick={handleJoinGame}>
            Join Game 
        </button>
        {/* <button onClick={handleCreateCode}> Create Code </button> */}
    

    </div>
    )
}

export default Lobby