import * as React from "react";

import { Splash } from "../Splash";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';
import { createLoginAction } from '../../redux/actions';

import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from "react-bootstrap"

interface loginProps {
    store: Store<mgmState>
}

export class Login extends React.Component<loginProps, {}> {

    state: {
        msg: string,
        username: string,
        password: string
    }


    constructor(props: loginProps) {
        super(props);
        this.state = {
            msg: this.props.store.getState().auth.errorMsg || '',
            username: '',
            password: ''
        };
    }

    onUsername(e: { target: { value: string } }) {
        this.setState({ username: e.target.value })
    }
    onPassword(e: { target: { value: string } }) {
        this.setState({ password: e.target.value })
    }
    handleLogin(e: React.FormEvent) {
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/login');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.log('Request failed.  Returned status of ' + xhr.status);
                this.setState({
                    msg: "Login failed, cannot contact MGM"
                })
            } else {
                let res = JSON.parse(xhr.response);
                if (res.Success) {
                    console.log('auth succeeded');
                    this.props.store.dispatch(createLoginAction({
                        username: res.username,
                        godLevel: res.accessLevel,
                        email: res.email,
                        token: res.token
                    }));
                } else {
                    console.log('auth failed');
                    this.setState({
                        msg: res.Message
                    })
                }
            }
        };
        xhr.send('payload=' + JSON.stringify({
            username: this.state.username,
            password: this.state.password
        }));

    }

    render() {
        let errorMsg = <div></div>
        if (this.state.msg) {
            errorMsg = <Alert bsStyle="danger">{this.state.msg}</Alert>
        }
        return (
            <div>
                <h1>Login View</h1>
                <Form inline={true} onSubmit={this.handleLogin.bind(this) }>
                    <FormGroup>
                        <ControlLabel>Username: </ControlLabel>
                        <FormControl placeholder="username" onChange={this.onUsername.bind(this) }/>
                        <ControlLabel>Password: </ControlLabel>
                        <FormControl type="password" placeholder="password" onChange={this.onPassword.bind(this) }/>
                        <Button type="submit">Login</Button>
                        {errorMsg}
                    </FormGroup>
                </Form>
                <Splash />
            </div>
        )
    }
}