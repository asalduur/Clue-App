import Modal from 'react-modal'
import {useState} from 'react'
import Accuse from './Accuse'


Modal.setAppElement('#root')
const AccuseSuggest = () => {

    const [selectedWeapon, setSelectedWeapon] = useState('')
    const [selectedRoom, setSelectedRoom] = useState('')
    const [selectedSuspect, setSelectedSuspect] = useState('')
    const [accuse, setAccuse] = useState(false)

    const handleAccuse = () => {
        setAccuse(true)
    }

    return (
        <div>
            <Modal isOpen={true}>
                <div className='modal_display'>
                    <div>
                        <h2> Weapons </h2>
                        <ul className='weapon_list'>
                            <li onClick={() => setSelectedWeapon('IcePick')}> IcePick </li>
                            <li onClick={() => setSelectedWeapon('Shank')}> Shank </li>
                            <li onClick={() => setSelectedWeapon('Coat Hanger')}> Coat Hanger </li>
                            <li onClick={() => setSelectedWeapon('Arsenic')}> Arsenic </li>
                            <li onClick={() => setSelectedWeapon('Blowtorch')}> Blowtorch </li>
                            <li onClick={() => setSelectedWeapon('Ninja Star')}> Ninja Star </li>
                        </ul>
                    </div>
                    <div>
                        <h2> Rooms </h2>
                        <ul className='room_list'>
                            <li onClick={() => setSelectedRoom('Grotto')}> Grotto </li>
                            <li onClick={() => setSelectedRoom('Pool-House')}> Pool-House </li>
                            <li onClick={() => setSelectedRoom('Library')}> Library </li>
                            <li onClick={() => setSelectedRoom('Kitchen')}> Kitchen </li>
                            <li onClick={() => setSelectedRoom('Basement')}> Basement </li>
                            <li onClick={() => setSelectedRoom('Wine Cellar')}> Wine Cellar </li>
                            <li onClick={() => setSelectedRoom('Foyer')}> Foyer </li>
                            <li onClick={() => setSelectedRoom('Garden')}> Garden </li>
                            <li onClick={() => setSelectedRoom('Master Bedroom')}> Master Bedroom </li>
                        </ul>
                    </div>
                    <div>
                        <h2> Suspects </h2>
                        <ul className='suspect_list'>
                            <li onClick={() => setSelectedSuspect('Butler')}> Butler </li>
                            <li onClick={() => setSelectedSuspect('Nanny')}> Nanny </li>
                            <li onClick={() => setSelectedSuspect('Doctor')}> Doctor </li>
                            <li onClick={() => setSelectedSuspect('Nosy-Neighbor')}> Nosy-Neighbor </li>
                            <li onClick={() => setSelectedSuspect('Chef')}> Chef </li>
                            <li onClick={() => setSelectedSuspect('Baby')}> Baby </li>
                        </ul>
                    </div>
                </div> 

                <div>
                    <h1> {selectedWeapon} </h1>
                    <h1> {selectedRoom} </h1>
                    <h1> {selectedSuspect} </h1>
                </div>

                <div>
                    <Accuse accuse={accuse} setAccuse={setAccuse} selectedSuspect={selectedSuspect} selectedRoom={selectedRoom} selectedWeapon={selectedWeapon}/>
                    <button> Suggest </button>
                    <button onClick={handleAccuse}> Accuse </button>
                </div>

            </Modal>
        </div>
    )
}

export default AccuseSuggest