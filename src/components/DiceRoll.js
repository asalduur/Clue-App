import { useState } from 'react'
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix
} from 'react-icons/fa'

const DiceRoll = () => {
  let [firstDieValue, setFirstDieValue] = useState(1)
  let [secondDieValue, setSecondDieValue] = useState(1)

  const handleRoll = () => {
    setFirstDieValue(0)
    setSecondDieValue(0)
    setFirstDieValue(Math.floor(Math.random() * 6) +1)
    setSecondDieValue(Math.floor(Math.random() * 6) +1)
    console.log(firstDieValue, secondDieValue)
  }

  return (
    <div className="dice-container">

      <div className="dice-wrapper">
        { firstDieValue === 1 ? <FaDiceOne className='die-1'/> : null }
        { firstDieValue === 2 ? <FaDiceTwo className='die-1'/> : null }
        { firstDieValue === 3 ? <FaDiceThree className='die-1'/> : null }
        { firstDieValue === 4 ? <FaDiceFour className='die-1'/> : null }
        { firstDieValue === 5 ? <FaDiceFive className='die-1'/> : null }
        { firstDieValue === 6 ? <FaDiceSix className='die-1'/> : null }

        { secondDieValue === 1 ? <FaDiceOne className='die-2'/> : null }
        { secondDieValue === 2 ? <FaDiceTwo className='die-2'/> : null }
        { secondDieValue === 3 ? <FaDiceThree className='die-2'/> : null }
        { secondDieValue === 4 ? <FaDiceFour className='die-2'/> : null }
        { secondDieValue === 5 ? <FaDiceFive className='die-2'/> : null }
        { secondDieValue === 6 ? <FaDiceSix className='die-2'/> : null }
      </div>

      <span className='dice-count'> total: {firstDieValue + secondDieValue}</span>

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

