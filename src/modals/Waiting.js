import { useContext, useEffect } from "react";
import Modal from "react-modal";
import { SocketContext } from "../context/SocketContext";

const Waiting = () => {
    const {proofmsg, waiting, setWaiting} = useContext(SocketContext)
    console.log(waiting)
    // useEffect(() => {
    //     return () => setWaiting(false)
    // }, [proofmsg, waiting])

    return (
        <Modal isOpen={waiting && !proofmsg}>
            <h1> Waiting for players to show proof </h1>
        </Modal>
    )
}

export default Waiting