import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { userService } from '../../../servives/userService'
import logo from '../../../images/tuba3d-small.png';
import styles from './index.module.css';
import UserContext from '../../../Context';

const Navigation = () => {
    const context = useContext(UserContext)
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (username.length < 3 || password.length < 3) {
            setMsg('Username or password is too short.');
            return;
        }

        const response = await userService.login({username, password});
        if (response.message) {
            setMsg(response.message);
            return;
        }

        setMsg(false);
        const user = response;
        context.logIn(user);
        console.log('the context logged is')
        console.log(context.user)
        history.push('/');
    }

    const handleLogOut = (ev) => {
        ev.preventDefault();
        context.logOut();
        console.log('in handel logout after app log out')
        console.log(context.user)
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo} alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/register"><h5 className={styles.navtext}>Register</h5></Nav.Link>
                </Nav>
                {context.user ?
                    <Form className={styles['nav-form']} onSubmit={handleLogOut} >
                        <Link to="/register"><h5 className={styles.navtext}>Welocome {context.user.username}</h5></Link>
                        <Nav.Link to="/playlist/create"><h5 className={styles.navtext}>Create New Playlist</h5></Nav.Link>
                        <Button variant="outline-light" type="submit" >Logout</Button>
                    </Form>
                :
                <Form className={styles['nav-form']} onSubmit={handleSubmit}>
                    <FormControl value={username} onChange={ev => setUsername(ev.target.value)} type="text" id="username" placeholder="Username" className="mr-sm-2" />
                    <FormControl value={password} onChange={ev => setPassword(ev.target.value)} type="password" id="password" placeholder="Password" className="mr-sm-2" />
                    <Button variant="outline-light" type="submit">Login</Button>
                    {msg ? <p className={styles.msg}>{msg}</p> : null}
                </Form>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;