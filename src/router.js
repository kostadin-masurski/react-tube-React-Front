import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Banner from './components/items/banner';
import NotFound from './pages/not-found'
import RegisterPage from './pages/register';
import CreatePage from './pages/create';
import EditPage from './pages/edit';


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Banner} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/playlist/create" component={CreatePage} />
                <Route exact path="/playlist/edit" component={EditPage} />
                {/* <Route path="/profile/:userid" component={Profile} /> */}
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router