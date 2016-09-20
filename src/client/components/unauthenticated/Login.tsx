import * as React from "react";

import { Splash } from "../Splash";
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';

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
            msg: '',
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
    handleLogin(){
        console.log('login attempt with: ');
        console.log(this.state);
        this.setState({
            msg: 'This is not implemented'
        })
    }

    render() {
        let errorMsg = <div></div>
        if(this.state.msg){
            errorMsg = <Alert bsStyle="danger">{this.state.msg}</Alert>
        }
        return (
            <div>
                <h1>Login View</h1>
                <Form inline={true}>
                    <FormGroup>
                        <ControlLabel>Username:</ControlLabel>
                        <FormControl placeholder="username" onChange={this.onUsername.bind(this) }/>
                        <ControlLabel>Password:</ControlLabel>
                        <FormControl type="password" placeholder="password" onChange={this.onPassword.bind(this) }/>
                        <Button onClick={this.handleLogin.bind(this)}>Login</Button>
                        {errorMsg}
                    </FormGroup>
                </Form>
                <Splash />
            </div>
        )
    }
}