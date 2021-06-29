import React, { useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Modal from '../components/Modal'
import 'materialize-css'

export const UserPage = () => {
  const [value, setValue] = useState('900000')
  const { request} = useHttp()
  const {token} = useContext(AuthContext)
  const { userId } = useContext(AuthContext)
  const [form, setForm] = useState({
    name: '', secName: '', token: {token}
  })
  const [show, setShow] = useState(false)
  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)
  const [listTrain, setListTrain] = useState('')
  const selectTime = (event) => {
    setValue(event.target.value)
    console.log(value)
  }



  const getTrain = async () => {
    try {
      const trains = await request('/api/link/links/' + userId, 'GET')
      setListTrain(trains.map((train) => <li class="collection-item">{train.name}</li>))
      console.log(listTrain)
  } catch(e) {}




  }

  useEffect(() => {
    if (show){
      showing()
    }

  })

  const showing = () => {
    if (!show) {
      openModal()
    }
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const sendInf = async () => {
    try {
      const data = await request('/api/link/setName', 'POST', { ...form })
      console.log(data)
      if(data){
        showing();
      }
      //setInterval(show, value)
      //setInterval(showing, 600)
    } catch (e) { }
  }


  // if (loading) {
  //   return <Loader/>
  // }

  return (
    <>

      <div className="settings">
        <div className="form">
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <div>
                <div className="input-field">
                  <input
                    placeholder="Введите имя"
                    id="name"
                    type="text"
                    name="name"
                    className="yellow-input"
                    value={form.name}
                    onChange={changeHandler}
                  />
                  <label htmlFor="login">Имя</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите фамилию"
                    id="secName"
                    type="text"
                    name="secName"
                    className="yellow-input"
                    value={form.secName}
                    onChange={changeHandler}
                  />
                  <label htmlFor="login">Фамилия</label>
                </div>
                <div className="input-field col s12">
                  <select value={value} onChange={selectTime}>
                    <option value=" " disabled selected >Выбрать время интервала</option>
                    <option value="900000" >15 минут</option>
                    <option value="1800000" >30 минут</option>
                    <option value="3600000" >60 минут</option>
                    <option value="5400000" >90 минут</option>
                  </select>
                </div>


                <ul class="collection">
                  {listTrain}
                </ul>

                <a href="#!" class="waves-effect waves-light btn" onClick={sendInf}>Сохранить</a>
                <a href="#!" class="waves-effect waves-light btn" onClick={getTrain}>Test</a>
              </div>
              </div>
            </div>
      </div>
      </div>
      <div className="App">
        <Modal closeModal={closeModal} show={show} />
      </div>
    </>
  )
}

export default UserPage
