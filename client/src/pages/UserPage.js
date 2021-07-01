import React, { useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Helmet } from 'react-helmet'
import { Loader } from '../components/Loader'
import useSound from 'use-sound';
import boopSfx from '../sounds/notification.mp3';
import Modal from '../components/Modal'
import 'materialize-css'

export const UserPage = () => {
  const [value, setValue] = useState('900000')
  const { request} = useHttp()
  const { userId } = useContext(AuthContext)
  const {token} = useContext(AuthContext)
  const [form, setForm] = useState({
    name: '', secName: '', token: {token}
  })
  const [show, setShow] = useState(false)
  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)
  const selectTime = (event) => {
    setValue(event.target.value)
    console.log(value)
  }
  const [title, setTitle] = useState('')
  const newTitle ='Время разминки!'
  const [play] = useSound(boopSfx)
  const [clickBurger, setClickBurger] = useState(false)
  const close = <div className="close"><svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" /></svg></div>
  const reorder = <div className="reorder"><svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 15H21V13H3V15ZM3 19H21V17H3V19ZM3 11H21V9H3V11ZM3 5V7H21V5H3Z" fill="white" /></svg></div>
  const [icon, setIcon] = useState(reorder)
  const [user, setUser] = useState('')

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const sendInf = async () => {
    try {
      const data = await request('/api/link/setName', 'POST', { ...form })
      console.log(data)
      startInterval()
      window.M.toast({ html: 'Данные сохранены' })
    } catch (e) { }
  }

  const startInterval = () => {
    setInterval(showing, value)
  }
  
  const openBurger = async () => {
    if (!clickBurger) {
      setClickBurger(true)
      setIcon(close)
      console.log(form)
    }
    else {
      setClickBurger(false)
      setIcon(reorder)
    }
    setUser(await request('/api/auth/' + userId, 'GET'));
    console.log('Ответ', user)
    setForm({ ...form, name: user.name, secName: user.secName })
  }

  const changeTitle = () => {
    if (title === '') {
      setTitle(newTitle)
    }
    else {
      setTitle('')
    }
  }


  const showing = useCallback(() => {
    if (!show) {
      openModal()
      changeTitle()
      play()
    }
  }, [show, title, play])

  useEffect(() => {
    if (show) {
      showing()
    }
  }, [show, showing] )




  return (
    <>
    <Helmet>
      <title>{title ? title: "WarmUp"}</title>
    </Helmet>
    <div className="wrapper">
      <div className="cont">
      <div className="burger" onClick={openBurger}>{icon}</div>
      <div className={clickBurger ? "settings" : "open settings"}>
        <div className="form">
          <div className="card up darken-1">
            <div className="card-content white-text">
              <div>
                <div className="input-field">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="yellow-input"
                    value={form.name}
                    onChange={changeHandler}
                  />
                  <label>Имя</label>
                </div>

                <div className="input-field">
                  <input
                    id="secName"
                    type="text"
                    name="secName"
                    className="yellow-input"
                    value={form.secName}
                    onChange={changeHandler}
                  />
                  <label>Фамилия</label>
                </div>
                <div className="input-field col s12">
                  <select value={value} onChange={selectTime}>
                    <option value=" " disabled selected >Выбрать время интервала</option>
                    <option value="60000" >1 минута</option>
                    <option value="900000" >15 минут</option>
                    <option value="1800000" >30 минут</option>
                    <option value="3600000" >60 минут</option>
                    <option value="5400000" >90 минут</option>
                  </select>
                </div>

                <a href="#!" class="waves-effect waves-light btn" onClick={sendInf}>Сохранить</a>
              </div>
              </div>
            </div>
      </div>
      </div>
      <div className="App">
        <Modal closeModal={closeModal} show={show} />
      </div>
        </div>
      </div>
    </>
  )
}


export default UserPage
