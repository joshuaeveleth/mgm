import * as React from "react";

import { Store } from 'redux'

interface loginProps {
    store: Store<any>
}

export class Login extends React.Component<loginProps, {}> {
    render() {
        let msg = this.props.store.getState().auth.errorMsg;
        return (
            <div>
                <h1>Login View</h1>
                <p>{msg}</p>
            </div>
        )
    }
}