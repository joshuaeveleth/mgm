import * as React from "react";

import { Splash } from "../Splash";
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';

interface loginProps {
    store: Store<mgmState>
}

export class Login extends React.Component<loginProps, {}> {
    render() {
        //let msg = this.context.store.getState().auth.errorMsg;
        return (
            <div>
                <h1>Login View</h1>
                <p>err message goes here</p>
                <Splash />
            </div>
        )
    }
}