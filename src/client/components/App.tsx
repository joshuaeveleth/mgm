import * as React from "react";
import { Store } from 'redux'

import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";

import { mgmState } from '../redux/reducers';

interface appProps {
    store: Store<mgmState>
}

export class App extends React.Component<appProps, {}> {
    private sub: Redux.Unsubscribe;
    state: {
        authenticated: boolean,
        route: string
    }

    constructor(props: appProps) {
        super(props);
        this.sub = this.props.store.subscribe(() => {
            let store = this.props.store.getState();
            if (this.state.authenticated !== store.auth.loggedIn) {
                this.setState({
                    authenticated: this.props.store.getState().auth.loggedIn
                })
            }
            if (this.state.route !== store.url) {
                this.setState({
                    route: store.url
                })
            }
        });
        this.state = {
            authenticated: this.props.store.getState().auth.loggedIn,
            route: this.props.store.getState().url
        };
    }

    componentWillUnmount() {
        this.sub();
    }

    render() {
        if (this.state.authenticated) {
            // show authenticated tree
            return <Authenticated route={this.state.route} store={this.props.store} />
        } else {
            // show splash, login, registration tree
            return <Unauthenticated route={this.state.route} store={this.props.store} />
        }
    }
}