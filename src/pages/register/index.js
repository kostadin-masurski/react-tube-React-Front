import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { userService } from '../../servives/userService';
import { validate } from '../../servives/validationService';
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';
import Context from '../../Context';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            msg: '',
            usernameMsg: '',
            emailMsg: '',
            passwordMsg: '',
            confirmPasswordMsg: '',
            disableSubmit: true
        }
    }

    static contextType = Context;

    onChange = async (ev, type) => {
        await this.setState(validate(ev.target.value, type));

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPasswordMsg: 'Passwords not matching'});
        } else {
            this.setState({ confirmPasswordMsg: false});
        }

        this.setState({ disableSubmit: true});
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
        this.props.history.push('/');
    }

    render() {
        return (
            <PageLayout>
                <Form className={styles["form-container"]} onSubmit={this.handleSubmit}>
                    <Title title="Register"/>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Usename</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'username')} type="text" placeholder="Enter Username" />
                        {this.state.usernameMsg ? <Form.Text className="text-danger">{this.state.usernameMsg}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'email')} type="email" placeholder="Enter email" />
                        {this.state.emailMsg ? <Form.Text className="text-danger">{this.state.emailMsg}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'password')} type="password" placeholder="Password" />
                        {this.state.passwordMsg ? <Form.Text className="text-danger">{this.state.passwordMsg}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'confirmPassword')} type="password" placeholder="Confirm Password" />
                        {this.state.confirmPasswordMsg ? <Form.Text className="text-danger">{this.state.confirmPasswordMsg}</Form.Text> : null}
                    </Form.Group>
                    {this.state.msg ? <p className={styles.msg}>{this.state.msg}</p> : null}
                    <Button variant="success" type="submit" disabled={this.state.disableSubmit}>Register</Button>
                </Form>
            </PageLayout>
        );
    }
}

export default withRouter(RegisterPage);