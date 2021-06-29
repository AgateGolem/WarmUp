import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const Navbar = () => {

  const history = useHistory()
  const auth = useContext(AuthContext)
  const isAuth = auth.isAuthenticated
  console.log('Auth', isAuth)
  const [click, setClick] = useState(0)

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
  return (
    <div>

    <nav>
        <div className="nav-wrapper">
       <a href="#!" className="brand-logo">=</a>
       <ul className="right hide-on-med-and-down">

         <li className={!isAuth ? 'hidden': ''}><a  onClick={clickMenu}  href="#!" data-target="dropdown1">Отжимания</a></li>
          <li className={!isAuth ? 'hidden': ''}><a className="dropdown-trigger" onClick={clickMenu} href="#!" data-target="dropdown2">Приседания</a></li>
          <li className={!isAuth ? 'hidden': ''}><a className="dropdown-trigger" onClick={clickMenu} href="#!" data-target="dropdown3">Планка</a></li>
          <li className={!isAuth ? 'hidden': ''}><a className="dropdown-trigger" onClick={clickMenu} href="#!" data-target="dropdown4">Махи</a></li>
         <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
       </ul>
     </div>
   
    </nav>
    <ul id="dropdown1"   className={click > 0 ? 'opened dropdown-content': 'dropdown-content'} >
      Описание упражнения
    </ul>
    <ul id="dropdown2"  className={click > 0 ? 'opened dropdown-content' : 'dropdown-content'} >
      Описание упражнения
    </ul>
    <ul id="dropdown3" className={click > 0 ? 'opened dropdown-content' : 'dropdown-content'} >
      Описание упражнения
    </ul>
    <ul id="dropdown4" className={click > 0 ? 'opened dropdown-content' : 'dropdown-content'} >
      Описание упражнения
    </ul>
    </div>
  )
}

export default Navbar
