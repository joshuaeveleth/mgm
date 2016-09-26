import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

import { UserView } from './UserView';
import { User } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap'

interface UserListProps {
    store: Store<mgmState>
}

export class UserList extends React.Component<UserListProps, {}> {
    state: {
        regions: User[]
    }
    unsub: Redux.Unsubscribe;

    constructor(props: UserListProps) {
        super(props);
        this.state = {
            regions: this.pullUsersFromStore()
        }
        this.unsub = this.props.store.subscribe(() => {
            this.setState({
                regions: this.pullUsersFromStore()
            });
        });
    }

    pullUsersFromStore(): User[] {
        let users: User[] = [];
        let state = this.props.store.getState().users;
        for (let uuid in state) {
            users.push(state[uuid]);
        }
        return users;
    }

    componentWillUnmount() {
        this.unsub();
    }

    render() {
        let users = this.state.regions.map((u: User) => {
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