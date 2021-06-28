import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const UserPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [form, setForm] = useState({
    name: '', secName: '',
  })

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            Юзер
          </div>
        </li>
        <li><div className="input-field">
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
        </div></li>
        <li></li>
        </ul>
      </>
  )
}
