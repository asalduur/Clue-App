import { useContext, useState } from 'react'
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix
} from 'react-icons/fa'
import { SocketContext } from '../context/SocketContext'

const DiceRoll = () => {
  let [firstDieValue, setFirstDieValue] = useState(1)
  let [secondDieValue, setSecondDieValue] = useState(1)

  const {active, activeRoll, sendRoll, rolltotal} = useContext(SocketContext)

  console.log(rolltotal);
  
  const handleRoll = async () => {
    if(active && activeRoll) {
      await setFirstDieValue(0)
      await setSecondDieValue(0)
      let roll1 = Math.floor(Math.random() * 6) +1;
      setFirstDieValue(roll1);
      let roll2 = Math.floor(Math.random() * 6) +1;
      setSecondDieValue(roll2);
      sendRoll(roll1 + roll2);
    }
  }

  return (
    <div className="dice-container">

      <div className="dice-wrapper">
        { firstDieValue === 0 ? <div className='empty'></div> : null }
        { firstDieValue === 1 ? <FaDiceOne className='die-1'/> : null }
        { firstDieValue === 2 ? <FaDiceTwo className='die-1'/> : null }
        { firstDieValue === 3 ? <FaDiceThree className='die-1'/> : null }
        { firstDieValue === 4 ? <FaDiceFour className='die-1'/> : null }
        { firstDieValue === 5 ? <FaDiceFive className='die-1'/> : null }
        { firstDieValue === 6 ? <FaDiceSix className='die-1'/> : null }
        
        { secondDieValue === 0 ? <div className='empty'></div> : null }
        { secondDieValue === 1 ? <FaDiceOne className='die-2'/> : null }
        { secondDieValue === 2 ? <FaDiceTwo className='die-2'/> : null }
        { secondDieValue === 3 ? <FaDiceThree className='die-2'/> : null }
        { secondDieValue === 4 ? <FaDiceFour className='die-2'/> : null }
        { secondDieValue === 5 ? <FaDiceFive className='die-2'/> : null }
        { secondDieValue === 6 ? <FaDiceSix className='die-2'/> : null }
      </div>

      <span className='dice-count'> total: {rolltotal}</span>

      <button 
        className="roll"
        onClick={handleRoll}
      >
        Roll
      </button>

    </div>
  )
}

export default DiceRoll

