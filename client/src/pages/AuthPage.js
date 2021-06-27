import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        login: '', password: '', sex: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    return(
        <div className="container">
            <header className="container__exercises">
                <ul className="container__list">
                    <li>Планка</li>
                    <li>Отжимания</li>
                    <li>Приседания</li>
                    <li>Прыжки</li>
                </ul>
            </header>
            <div className="container__settings">
                <div className="container__register visible">
                    <div className="container__input">
                        <label htmlFor="login">Логин</label>
                        <input
                            placeholder="Введите логин"
                            id="login"
                            type="text"
                            name="login"
                            onChange={changeHandler} />
                    </div>
                    <div className="container__input">
                        <label htmlFor="login">Пароль</label>
                        <input
                            placeholder="Введите пароль"
                            id="password"
                            type="password"
                            name="password"
                            onChange={changeHandler} />
                    </div>
                    <div className="radio">
                        <form>
                            <input name="sex" type="radio" value="male" onChange={changeHandler}></input>
                            <label htmlFor="male">Мужской</label>
                            <input name="sex" type="radio" value="female" onChange={changeHandler}></input></form>
                        <label htmlFor="female">Женский</label>
                    </div>
                    <div className="container__button">
                        <button
                            onClick={registerHandler}
                            disabled={loading}>Регистрация</button>
                    </div>
                </div>
            
                <div className="container__login visible">
                    <div className="container__input">
                        <label htmlFor="login">Логин</label>
                        <input
                            placeholder="Введите логин"
                            id="login"
                            type="text"
                            name="login"
                            onChange={changeHandler} />
                    </div>
                    <div className="container__input">
                        <label htmlFor="login">Пароль</label>
                        <input
                            placeholder="Введите пароль"
                            id="password"
                            type="password"
                            name="password"
                            onChange={changeHandler} />
                    </div>
                    <div className="container__button">
                        <button
                            onClick={loginHandler}
                            disabled={loading}>Вход</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage