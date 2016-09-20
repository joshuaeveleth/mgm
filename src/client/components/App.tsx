import * as React from "react";
import { Store } from 'redux'

import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";

import { mgmState } from '../redux/reducers';

interface appProps {
    store: Store<mgmState>
}

export class App extends React.Component<appProps, {}> {
    private urlSub: Redux.Unsubscribe;
    state: {
        authenticated: boolean
    }

    constructor(props: appProps){
        super(props);
        this.urlSub = this.props.store.subscribe(() => {
            this.setState({
                authenticated: this.props.store.getState().auth.loggedIn
            })
        });
        this.state = {
            authenticated: this.props.store.getState().auth.loggedIn
        };
    }

    componentWillUnmount() {
        this.urlSub();
    }

    render() {
        if (this.state.authenticated) {
            // show authenticated tree
            return <Authenticated store={this.props.store} />
        } else {
            // show splash, login, registration tree
            return <Unauthenticated store={this.props.store} />
        }
    }
}