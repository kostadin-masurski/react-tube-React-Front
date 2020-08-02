import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { userService } from '../../../servives/userService'
import logo from '../../../images/tuba3d-small.png';
import styles from './index.module.css';

const Navigation = () => {
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
        //history.push('/');not working
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
                <Form inline onSubmit={handleSubmit}>
                    <Nav.Link href="/home"><h5 className={styles.navtext}>Welocom user</h5></Nav.Link>
                    <Link to="/playlist/create"><h5 className={styles.navtext}>Create New Playlist</h5></Link>
                    <FormControl value={username} onChange={ev => setUsername(ev.target.value)} type="text" id="username" placeholder="Username" className="mr-sm-2" />
                    <FormControl value={password} onChange={ev => setPassword(ev.target.value)} type="password" id="password" placeholder="Password" className="mr-sm-2" />
                    <Button variant="outline-light" type="submit">Login</Button>
                    <Button variant="outline-light">Logout</Button>
                    {msg ? <p className={styles.msg}>{msg}</p> : null}
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;