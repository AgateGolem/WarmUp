import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    login: '', password: '', sex: ''
  })
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const changeToggle = () => {
    if (toggle) {
      setToggle(false)
    }
    else {
      setToggle(true)
    }
    console.log(toggle)
  }

  return (
    <>

      <div className="wrapper">
        <div className='cont'>
        <div className={toggle ? "closed card" : "card auth"}>
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите логин"
                  id="login"
                  type="text"
                  name="login"
                  className="yellow-input"
                  value={form.login}
                  onChange={changeHandler}
                />
                <label htmlFor="login">Логин</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="login">Пароль</label>
              </div>

            </div>
          </div>

          <div className="card-action">
            <button
              className="btn  darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn lighten-1 black-text"
              onClick={changeToggle}
              disabled={loading}
            >
              Регистрация
            </button>

          </div>
        </div>


      <div className={toggle ? "card auth" : "closed card" }>
        <div className="card-content white-text">
          <span className="card-title">Регистрация</span>
          <div>

            <div className="input-field">
              <input
                placeholder="Введите логин"
                id="login"
                type="text"
                name="login"
                className="yellow-input"
                value={form.login}
                onChange={changeHandler}
              />
              <label htmlFor="login">Логин</label>
            </div>

            <div className="input-field">
              <input
                placeholder="Введите пароль"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor="login">Пароль</label>
            </div>

            <div className="input-radio">
              <label>
                <input type="radio" name="sex" onClick={changeHandler} value="male" />
                <span>Мужской</span>
              </label>
              <label>
                <input type="radio" name="sex" onClick={changeHandler} value="female" />
                <span>Женский</span>
              </label>
            </div>

          </div>
        </div>

        <div className="card-action reg">
          <button
            className="btn  darken-4"
            style={{ marginRight: 10 }}
            disabled={loading}
            onClick={changeToggle}
          >
            Войти
          </button>
          <button
            className="btn lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading}
          >
            Регистрация
          </button>

        </div>
      </div>


      <div class="row">
        <div class="col s12 m6">
          <div class="card desc white darken-1">
            <div class="card-content black-text">
              <p>Если вы проводите большую часть рабочего дня сидя, а вся ваше физичекая активность сводиться к прогулкам к холодильнику в обеденном перерыве, то самое время что-то менять.
                <br/>Уже давно известно, что сидячая работа плохо влияет на здоровье человека, а также является причиной многих серьезных заболеваний и нарушений в работе организма. Наверняка вы и сами об этом знаете. Потому очень важно чередовать сидение и физическую активность, в чем и поможет наше приложение.
                <br/>В приложении представлены простые, но в тоже время эффективные упражнения, рассчитанные на любой уровень физической подготовки. Достаточно просто установить таймер и приложение само напомнит, что пришло время размяться.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>


    </>
  )
}

export default AuthPage
