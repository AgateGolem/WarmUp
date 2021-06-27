import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import {UserPage} from './pages/UserPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path = "/user">
                    <UserPage />
                </Route>
                <Redirect to ="/user"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}