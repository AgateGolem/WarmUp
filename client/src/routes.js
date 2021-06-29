import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {UserPage} from './pages/UserPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  console.log(isAuthenticated);
  if (isAuthenticated) {

    return (
      <Switch>
        <Route path="/users" exact>
          <UserPage />
        </Route>
        <Redirect to="/users" />
      </Switch>
    )
  } else{
    return (
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }




}
