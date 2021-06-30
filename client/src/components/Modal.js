import React, {useState, useContext} from "react"
import 'materialize-css'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import Otzhim from '../img/otzhim.jpg'
import Planka from '../img/planka.jpg'
import Prised from '../img/prised.png'
import Prizhki from '../img/prizhki.jpg'

function Modal(props) {
    const { show, closeModal} = props;
    const [isActive, setActive] = useState(false)
    const { userId } = useContext(AuthContext)
    const [activeTrainName, setActiveTrainName] = useState('')
    const [activeTrainDesc, setActiveTrainDesc] = useState('')
    const [activeTrainYt, setActiveTrainYt] = useState('')
    const {request} = useHttp()
    const [imgSrc, setImgSrc] = useState('')

    const startTrain = async () => {
        closeModal();
        setActive(true);
        const fetched = await request('/api/link/links/' + userId, 'GET');
        const len = fetched.length
        const num = Math.floor(Math.random() * len)
        switch (fetched[num].name) {
            case 'Отжимания':
                setImgSrc(Otzhim)
                break
            case 'Приседания':
                setImgSrc(Prised)
                break
            case 'Планка':
                setImgSrc(Planka)
                break
            case 'Прыжки':
                setImgSrc(Prizhki)
                break
        }
        setActiveTrainName(fetched[num].name)
        setActiveTrainDesc(fetched[num].description)
        setActiveTrainYt(<a href={fetched[num].sourceYT}>Ссылка на видеоролик</a>)
    }

    const skipTrain = () => {
        closeModal()
    }


    const closeModalSecond = () => {
        setActive(false)
    }

    return (
        <>
            <title></title>
            <div className={show ? "modal" : "hide"}>
                <h1>Время разминки!</h1>
                <a href="#!" class="waves-effect waves-light btn start" onClick={startTrain}>Начать</a>
                <a href="#!" class="waves-effect waves-light btn skip" onClick={skipTrain}>Пропустить</a>
            </div>
            <div className= {isActive ? "modal" : "hide"}>
                <button onClick={closeModalSecond}>X</button>
                <p>{activeTrainName}</p>
                <p>{activeTrainDesc}</p>
                <p>{activeTrainYt}</p>
                <img src={imgSrc}/>
            </div>
        </>
    )
}

export default Modal
