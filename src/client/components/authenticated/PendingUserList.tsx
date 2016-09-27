import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

import { PendingUser } from '../../../common/messages';
import { PendingUserView } from './PendingUserView';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
    store: Store<mgmState>
}

export class PendingUserList extends React.Component<props, {}> {
    state: {
        users: PendingUser[]
    }
    unsub: Redux.Unsubscribe;

    constructor(props: props) {
        super(props);
        this.unsub = this.props.store.subscribe(() => {
            this.setState({
                users: this.pullUsersFromStore()
            });
        });
        this.state = {
            users: this.pullUsersFromStore()
        }
    }

    pullUsersFromStore(): PendingUser[] {
        let users: PendingUser[] = [];
        let state = this.props.store.getState().pendingUsers;
        for (let uuid in state) {
            users.push(state[uuid]);
        }
        return users;
    }

    componentWillUnmount() {
        this.unsub();
    }

    render() {
        let users = this.state.users.map((u: PendingUser) => {
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