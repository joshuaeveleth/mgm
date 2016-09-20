import * as React from "react";

import { Splash } from "../Splash";
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';

interface loginProps {
    store: Store<mgmState>
}

export class Login extends React.Component<loginProps, {}> {

    state: {
        msg: string,
        username: string,
        password: string
    }


    constructor(props: loginProps) {
        super(props);
        this.state = {
            msg: '',
            username: '',
            password: ''
        };
    }

    componentWillMount() {

    }
    componentWillUnmount() {

    }

    render() {
        let msg = this.props.store.getState().auth.errorMsg;
        return (
            <div>
                <h1>Login View</h1>
                <p>{msg}</p>
                <Splash />
            </div>
        )
    }
}