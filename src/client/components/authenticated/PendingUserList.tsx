import * as React from "react";
import { Action } from 'redux'

import { PendingUser } from '../../../common/messages';
import { PendingUserView } from './PendingUserView';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
    dispatch: (a: Action) => void,
    users: {[key: string]: PendingUser}
}

export class PendingUserList extends React.Component<props, {}> {


    pullUsersFromStore(): PendingUser[] {
        let users: PendingUser[] = [];
        let state = this.props.users;
        for (let uuid in state) {
            users.push(state[uuid]);
        }
        return users;
    }


    render() {
        let users = this.pullUsersFromStore().map((u: PendingUser) => {
            return <PendingUserView key={u.name} user={u}/>
        })

        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={3}>Position</Col>
                    <Col md={3}>Registered</Col>
                    <Col md={3}>Summary</Col>
                </Row>
                {users}
            </Grid>
        )
    }
}