import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { userService } from '../../servives/userService'
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';
import UserContext from '../../Context';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            msg: false,
            usernameMsg: false,
            emailMsg: false,
            passwordMsg: false,
            confirmPasswordMsg: false,
            disableSubmit: true
        }
    }

    static contextType = UserContext;

    onBlur = async (ev, type) => {
        this.setState({ msg: false });
        const newState = {};
        newState[type] = ev.target.value;
        await this.setState(newState);
        this.validateInput();
    }

    validateInput() {
        this.setState({ disableSubmit: true, usernameMsg: false, emailMsg: false, passwordMsg: false, confirmPasswordMsg: false});

        if (/[!#$%^&*()+=[\]{};':"\\|,<>/?]/.test(this.state.username)) {
            this.setState({ usernameMsg: 'Username should contain only alphanumeric symbols, @ or _'});
        }

        if (this.state.username.length < 3) {
            this.setState({ usernameMsg: 'Username should be more than 3 symbols long'});
        }

        if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(this.state.email)) {
            this.setState({ emailMsg: 'Email is not valid'});
        }

        if (this.state.password.length < 6) {
            this.setState({ passwordMsg: 'Password should be more than 5 symbols long'});
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPasswordMsg: 'Passwords not matching'});
        }

        if (this.state.usernameMsg === false && this.state.emailMsg === false && this.state.passwordMsg === false && this.state.confirmPasswordMsg === false) {
            this.setState({ disableSubmit: false});
        }
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();

        const response = await userService.register(this.state);
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }

        const user = response;
        this.context.logIn(user);
        //this.context.user = user;
        console.log('the context is :');
        console.log(this.context);
        this.props.history.push('/');
    }

    render() {
        return (
            <PageLayout>
                <Form className={styles["form-container"]} onSubmit={this.handleSubmit}>
                    <Title title="Register"/>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Usename</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'username')} type="text" placeholder="Enter Username" />
                        {this.state.usernameMsg ? <Form.Text className="text-danger">{this.state.usernameMsg}</Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'email')} type="email" placeholder="Enter email" />
                        {this.state.emailMsg ? <Form.Text className="text-danger">{this.state.emailMsg}</Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'password')} type="password" placeholder="Password" />
                        {this.state.passwordMsg ? <Form.Text className="text-danger">{this.state.passwordMsg}</Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'confirmPassword')} type="password" placeholder="Confirm Password" />
                        {this.state.confirmPasswordMsg ? <Form.Text className="text-danger">{this.state.confirmPasswordMsg}</Form.Text> : null}
                    </Form.Group>

                    {this.state.msg ? <p className={styles.msg}>{this.state.msg}</p> : null}
                    <Button variant="success" type="submit" disabled={this.state.disableSubmit}>Register</Button>
                </Form>
            </PageLayout>
        );
    }
}

export default RegisterPage;