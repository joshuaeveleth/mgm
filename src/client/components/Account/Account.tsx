import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { User, Job } from '../../redux/model';
import { createSetMyPasswordAction } from '../../redux/actions';

import { Grid, Row, Col, Button } from 'react-bootstrap';

import { JobList } from './JobList';
import { SetPasswordModal } from '../SetPassword';

interface props {
    dispatch: (a: Action) => void,
    user: User
    jobs: Map<number,Job>
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
        this.props.dispatch(createSetMyPasswordAction(password));
        this.setState({
            showPasswordModal: false
        })
    }

    showNewPassword() {
        this.setState({
            showPasswordModal: true
        })
    }

    cancelNewPassword() {
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
                <hr />
                {passwordReset}
                <hr />
                <JobList dispatch={this.props.dispatch} jobs={this.props.jobs}/>
            </Grid>
        )
    }
}