import React, { useContext, useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'


export const Navbar = () => {

  //const { request } = useHttp()
  const auth = useContext(AuthContext)
  const isAuth = auth.isAuthenticated
  //const userId = auth.userId
  const [click, setClick] = useState(0)
  const [userName, setUserName] = useState('пользователь')

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
  }

//  useEffect( () => {
//    async function fetchData() {
//      console.log(isAuth)
//      if (isAuth){ 
//        setUserName(await request('/api/auth/' + userId, 'GET'))
//        console.log(userName)
//      }
//    }
//    fetchData()
//  }, [userName, isAuth, request, userId])

  const clickMenu1 = () => {
    if (click !== 1) {
      setClick(1)
    }
    else {
      setClick(0)
    }
  }
  const clickMenu2 = () => {
    if (click !== 2) {
      setClick(2)
    }
    else {
      setClick(0)
    }
  }
  const clickMenu3 = () => {
    if (click !== 3) {
      setClick(3)
    }
    else {
      setClick(0)
    }
  }
  const clickMenu4 = () => {
    if (click !== 4) {
      setClick(4)
    }
    else {
      setClick(0)
    }
  }

  return (
    <div>

    <nav>
      <div className="nav-wrapper">
        <ul className="left hide-on-med-and-down">
          <li className={!isAuth ? 'hidden' : ''}><a value="Отжимания" onClick={clickMenu1} href="#!" data-target="dropdown1">Отжимания</a></li>
            <li className={!isAuth ? 'hidden' : ''}><a className="dropdown-trigger" value="Приседания" onClick={clickMenu2} href="#!" data-target="dropdown2">Приседания</a></li>
            <li className={!isAuth ? 'hidden' : ''}><a className="dropdown-trigger" value="Планка" onClick={clickMenu3} href="#!" data-target="dropdown3">Планка</a></li>
            <li className={!isAuth ? 'hidden' : ''}><a className="dropdown-trigger" value="Прыжки" onClick={clickMenu4} href="#!" data-target="dropdown4">Прыжки</a></li>
          <li className={!isAuth ? 'hidden' : ''}>Здравствуйте, {userName}!</li>
          <li className={!isAuth ? 'hidden' : ''}><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
  
    </nav>
      <div id="dropdown1" className={click === 1 ? 'opened dropdown-content': 'dropdown-content'} >
        <p>Отжимания — базовое физическое упражнение, выполняемое в планке и представляющее собой опускание-поднятие тела с помощью рук от пола (предпочтительно), скамьи, стула, стола, стены и т. д. Возможно, с дополнительным отягощением. При выполнении упражнения задействованы большие грудные мышцы и трицепс, а также дельтовидные мышцы, локтевая мышца и плечевой пояс в целом.
          Для выполнения упражнения необходимо принять положение упора лёжа на полу. После этого согнуть руки в локтях, опустив при этом тело до параллели с полом, после чего, напрягая тело, медленно разогнуть руки, вернувшись в исходное положение. Всё это считается одним отжиманием. Изменение положения тела при отжиманиях помогает сконцентрировать нагрузку на определенных мышцах.</p>
        <a href="https://ru.wikipedia.org/wiki/%D0%9E%D1%82%D0%B6%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D1%8F">Ссылка на Wikipedia</a>
    </div>
      <div id="dropdown2"  className={click === 2 ? 'opened dropdown-content' : 'dropdown-content'} >
        <p>Приседание считается одним из важнейших упражнений не только в силовом спорте, но и в общефизической подготовке, а также используется в качестве подсобного в процессе подготовки спортсменов практически всех спортивных дисциплин.
          При систематическом выполнении приседа укрепляются мышцы, суставы, коленные сухожилия, заметно улучшается осанка и координация движений. Несмотря на то, что присед классический и его разновидности относятся к силовым упражнениям, нагрузка благотворно воздействует на сердечно-сосудистую систему. Но только при условии соблюдения техники выполнения упражнения.</p>
        <a href="https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B8%D1%81%D0%B5%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F">Ссылка на Wikipedia</a>
    </div>
      <div id="dropdown3"  className={click === 3 ? 'opened dropdown-content' : 'dropdown-content'} >
        <p>Планка — статическое изометрическое физическое упражнение на мышцы живота и спины. Планка похожа на начальную позицию отжиманий, в которой требуется удержаться долгое время. Упражнение способствует общему укреплению мышц тела.
        Самая распространённая поза похожа на позу отжимания. Вес тела держится на руках, локтях и пальцах ног. Локти расположены под плечами вертикально под прямым углом, а всё остальное тело принимает форму прямой линии — не приподнятое и не закруглённое. Выполнение упражнения рекомендуется начинать с наиболее легкой вариации и режима «15 секунд планка + 30 секунд отдыха», суммарно делая 3-4 повторения. Постепенно время нахождения в планке должно быть увеличено до 60-120 секунд
          Существует много вариаций, например, боковая и обратная планка. Планкой пользуются как составляющей йоги, а также как составляющей занятий боксом и другими видами спорта.</p>
        <a href="https://ru.wikipedia.org/wiki/%D0%9F%D0%BB%D0%B0%D0%BD%D0%BA%D0%B0_(%D1%83%D0%BF%D1%80%D0%B0%D0%B6%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5)">Ссылка на Wikipedia</a>
    </div>
      <div id="dropdown4"  className={click === 4 ? 'opened dropdown-content' : 'dropdown-content'} >
        <p>Базовое упражнение для разминки всего тела. Может быть использовать перед кардио или силовой работы на ноги.Этот вид физической нагрузки способен разнообразить однотипную зарядку, наполнив тело энергией и бодростью на весь день.
          Прыжки эффективно съедают калории, накопленные в жировых прослойках, поэтому данный способ похудения необычайно популярен как у женщин, так и мужчин. Польза от интенсивных тренировок заключается в контролируемом формировании мышечной массы, подтяжке кожного покрова и улучшения общего состояния здоровья. Регулировать нагрузку можно скоростью выполнения прыжков, усложнениями элементов и утяжелителями.
          Обычные прыжки на месте на протяжении 1 минуты заменяют двухминутную ходьбу. А получасовые подпрыгивания гарантировано сжигают 350-430 калорий. </p>
        <a href="https://zdv.su/pryzhki-na-meste-polza/">Ссылка на Wikipedia</a>
    </div>
    </div>
  )
}

export default Navbar
