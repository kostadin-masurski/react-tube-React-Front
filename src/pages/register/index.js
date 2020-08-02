import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { userService } from '../../servives/userService'
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            msg: false
        }
    }

    onBlur = (ev, type) => {
        const newState = {};
        newState[type] = ev.target.value;
        this.setState(newState);
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();

        const response = await userService.register(this.state);
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }

        this.setState({ msg: false });
        const user = response;
        console.log(user)
        //this.props.history.push('/'); nort tested
    }

    render() {
        //const { username, email, password, confirmPassword } = this.state;

        return (
            <PageLayout>
                <Form className={styles["form-container"]} onSubmit={this.handleSubmit}>
                    <Title title="Register"/>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Usename</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'username')} type="text" placeholder="Enter Username" />
                        <Form.Text className="text-danger">Username msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'email')} type="email" placeholder="Enter email" />
                        <Form.Text className="text-danger">Email msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'password')} type="password" placeholder="Password" />
                        <Form.Text className="text-danger">Password msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, 'confirmPassword')} type="password" placeholder="Confirm Password" />
                        <Form.Text className="text-danger">Confirm Password msg</Form.Text>
                    </Form.Group>

                    {this.state.msg ? <p className={styles.msg}>{this.state.msg}</p> : null}
                    <Button variant="success" type="submit">Register</Button>
                </Form>
            </PageLayout>
        );
    }
}

export default RegisterPage;