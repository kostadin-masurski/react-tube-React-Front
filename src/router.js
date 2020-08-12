import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Context from './Context';
import IndexPage from './pages/index';
import HomePage from './pages/home';
import NotFound from './pages/not-found'
import RegisterPage from './pages/register';
import CreatePage from './pages/create';
import EditPage from './pages/edit';


const Router = () => {
    const context = useContext(Context);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">{context.user ? <Redirect to="/home" /> : <IndexPage /> }</Route>
                <Route exact path="/home">{context.user ? <HomePage /> : <Redirect to="/" /> }</Route>
                <Route exact path="/register">{context.user ? <Redirect to="/" /> : <RegisterPage /> }</Route>
                <Route exact path="/playlist/create">{context.user ? <CreatePage /> : <Redirect to="/" /> }</Route>
                <Route exact path="/playlist/edit">{context.user ? <EditPage /> : <Redirect to="/" /> }</Route>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router