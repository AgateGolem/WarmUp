import React, {useState, useContext} from "react"
import 'materialize-css'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'

function Modal(props) {
    const { show, closeModal, closeModalSec} = props;
    const [isActive, setActive] = useState(false)
    const { userId } = useContext(AuthContext)
    const [activeTrainName, setActiveTrainName] = useState('')
    const [activeTrainDesc, setActiveTrainDesc] = useState('')
    const [activeTrainYt, setActiveTrainYt] = useState('')
      const {request} = useHttp()

    const startTrain = async () => {

        closeModal();
        setActive(true);
       const fetched = await request('/api/link/links/' + userId, 'GET');
       const len = fetched.length
       const num = Math.floor(Math.random() * len)
       setActiveTrainName(fetched[num].name)
       setActiveTrainDesc(fetched[num].description)

       setActiveTrainYt(<a href={fetched[num].sourceYT}>Ссылка на видеоролик</a>)

    }


    const closeModalSecond = () => {
      setActive(false)
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
                <button onClick={closeModalSecond}>X</button>
                <p>{activeTrainName}</p>
                <p>{activeTrainDesc}</p>
                <p>{activeTrainYt}</p>
            </div>
        </>
    )
}

export default Modal
