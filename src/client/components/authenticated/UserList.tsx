import * as React from "react";
import { Action } from 'redux'

import { UserView } from './UserView';
import { User } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap'

interface UserListProps {
    dispatch: (a: Action) => void,
    users: {[key: string]: User}
}

export class UserList extends React.Component<UserListProps, {}> {

    pullUsersFromStore(): User[] {
        let users: User[] = [];
        for (let uuid in this.props.users) {
            users.push(this.props.users[uuid]);
        }
        return users;
    }

    render() {
        let users = this.pullUsersFromStore().map((u: User) => {
            return <UserView key={u.uuid} user={u}/>
        })

        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={3}>Email</Col>
                </Row>
                {users}
            </Grid>
        )
    }
}