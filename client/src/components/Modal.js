import React, {useState, useContext} from "react"
import 'materialize-css'
import { AuthContext } from '../context/AuthContext'


function Modal(props) {
    const { show, closeModal} = props;
    const [isActive, setActive] = useState(false)
    const { userId } = useContext(AuthContext)
    const [activeTrain, setActiveTrain] = useState('')

    const startTrain = () => {
        setActive(!isActive)
        const fetched = request('/api/link/links/' + userId, 'GET')
        const len = fetched.length
        setActiveTrain(Math.floor(Math.random() * len))
    }

    return (
        <>
            <div className={show ? "modal" : "hide"}>
                <button onClick={closeModal}>X</button>
                <h1>Время разминки!</h1>
                <a class="waves-effect waves-light btn" onClick={startTrain}>Начать</a>
                <a class="waves-effect waves-light btn">Пропустить</a>
            </div>
            <div className= {isActive ? "modal" : "hide"}>
                <button onClick={closeModal}>X</button>
                <p>{activeTrain}</p>
            </div>
        </>
    )
}

export default Modal