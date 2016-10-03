import * as React from "react";
import { Action } from 'redux'

import { LoginUser } from '../../redux/model';

import { Grid, Row, Col, Button } from 'react-bootstrap';

import { SetPasswordModal } from './SetPassword';

interface props {
    dispatch: (a: Action) => void,
    user: LoginUser
}

export class Account extends React.Component<props, {}> {
    state: {
        showPasswordModal: boolean
    }

    constructor(props: props) {
        super(props);
        this.state = {
            showPasswordModal: false
        }
    }

    handleNewPassword(password: string) {
        console.log('change user password to: ' + password);
        this.setState({
            showPasswordModal: false
        })
    }

    showNewPassword() {
        console.log('show password modal')
        this.setState({
            showPasswordModal: true
        })
    }

    cancelNewPassword() {
        console.log('hide password modal')
        this.setState({
            showPasswordModal: false
        })
    }

    render() {
        let passwordReset = <div><Button onClick={this.showNewPassword.bind(this) }>Set Password</Button></div>
        if (this.state.showPasswordModal) {
            passwordReset = (
                <div>
                    <Button onClick={this.showNewPassword.bind(this) } disabled>Set Password</Button>
                    <SetPasswordModal submit={this.handleNewPassword.bind(this) } cancel={this.cancelNewPassword.bind(this) } />
                </div>
            )
        }
        return (
            <Grid>
                <Row>
                    <Col md={6}>Avatar Name</Col>
                    <Col md={6}>{this.props.user.name}</Col>
                </Row>
                <Row>
                    <Col md={6}>Avatar User Level</Col>
                    <Col md={6}>{this.props.user.godLevel}</Col>
                </Row>
                <Row>
                    <Col md={6}>User Email</Col>
                    <Col md={6}>{this.props.user.email}</Col>
                </Row>
                <Row>
                    <hr />
                </Row>
                {passwordReset}
                <Row>
                    <span>Task list</span>
                </Row>
            </Grid>
        )
    }
}
