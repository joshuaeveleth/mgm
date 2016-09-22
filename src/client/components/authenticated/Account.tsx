import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

interface authenticatedProps {
    store: Store<mgmState>
}

export class Account extends React.Component<authenticatedProps, {}> {
    render() {
        let user = this.props.store.getState().auth.user;
        return (
            <div>
                <h1>Account View</h1>
                <p>Avatar Name: {user.username}</p>
                <p>Avatar User Level: {user.godLevel}</p>
                <p>User Email: {user.email}</p>
            </div>
        )
    }
}
