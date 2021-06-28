import React, {useContext, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'

export const Navbar = () => {
  const {token} = useContext(AuthContext)
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [click, setClick] = useState(0)
    const {request} = useHttp()

    const [dat, setDat] = useState({
      name:"Отжимания", description:"Описание1", sex: "male"
    })

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const clickMenu = event => {
     setClick(click+1)
     if(click > 0){
       setClick(click-1)
     } else{
       setClick(click+1)
     }


  }
  const clickElem = event => {

    //const fetched =  request('/api/link', 'GET')
    //console.log(fetched)
    console.log(dat)

    const pst = request('/api/link/generate', 'POST', {...dat})

    }



return (
    <div>

    <span onClick={clickElem} >что нибудь</span>
    <nav>
        <div className="nav-wrapper">
       <a href="#!" className="brand-logo">WarmUp</a>
       <ul className="right hide-on-med-and-down">

         <li><a className="dropdown-trigger" onClick={clickMenu}  href="#!" data-target="dropdown1">Dropdown</a></li>
         <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
       </ul>
     </div>
    </nav>
    <ul id="dropdown1" className="dropdown-content"  className={click > 0 ? 'opened dropdown-content': 'dropdown-content'} >
      <li><a href="#!">one</a></li>
      <li><a href="#!">two</a></li>
      <li className="divider"></li>
      <li><a href="#!">three</a></li>
    </ul>
    </div>
  )
}
