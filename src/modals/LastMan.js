import { useContext } from 'react'
import Modal from 'react-modal'
import { SocketContext } from '../context/SocketContext'

const LastMan = () => {
  const {lastMan, casefile} = useContext(SocketContext)
  return (
    <Modal isOpen={lastMan} className='last-man-modal'>
      <p>The other players have left the room, so you won by default!</p>
      <p>Mr. Boddy was murdered with a <span className="selectedText">{casefile.weapon}</span> by the<span className="selectedText">{casefile.suspect}</span> in the <span className="selectedText">{casefile.room}</span>. </p>
    </Modal>
  )
}

export default LastMan