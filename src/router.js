import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Context from './Context';
import Banner from './components/items/banner';
import NotFound from './pages/not-found'
import RegisterPage from './pages/register';
import CreatePage from './pages/create';
import EditPage from './pages/edit';


const Router = () => {
    const context = useContext(Context);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Banner} />
                <Route exact path="/register">{context.user ? <Redirect to="/" /> : <RegisterPage /> }</Route>
                <Route exact path="/playlist/create">{context.user ? <CreatePage /> : <Redirect to="/" /> }</Route>
                <Route exact path="/playlist/edit">{context.user ? <EditPage /> : <Redirect to="/" /> }</Route>
                {/* <Route path="/profile/:userid" component={Profile} /> */}
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router