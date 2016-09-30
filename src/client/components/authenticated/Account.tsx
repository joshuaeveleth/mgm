import * as React from "react";
import { Action } from 'redux'

import { LoginUser } from '../../redux/model';

interface authenticatedProps {
    dispatch: (a: Action) => void,
    user: LoginUser
}

export class Account extends React.Component<authenticatedProps, {}> {
    render() {
        return (
            <div>
                <h1>Your Account</h1>
                <p>Avatar Name: {this.props.user.name}</p>
                <p>Avatar User Level: {this.props.user.godLevel}</p>
                <p>User Email: {this.props.user.email}</p>
            </div>
        )
    }
}
