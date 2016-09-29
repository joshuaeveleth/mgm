import * as React from "react";
import { Store } from 'redux'

import { Authenticated } from "./Authenticated";
import { Unauthenticated } from "./Unauthenticated";

import { mgmState } from '../redux/model';

interface appProps {
    store: Store<mgmState>
}

export class App extends React.Component<appProps, {}> {
    private sub: Redux.Unsubscribe;
    state: mgmState;

    constructor(props: appProps) {
        super(props);
        this.sub = this.props.store.subscribe(() => {
            if(this.state != this.props.store.getState()){
                this.setState(this.props.store.getState());
            }
        });
        this.state = this.props.store.getState();
    }

    updateState(){
        let state = this.props.store.getState();
    }

    render() {
        if (this.state.auth.loggedIn) {
            // show authenticated tree
            return <Authenticated route={this.state.url} store={this.props.store} />
        } else {
            // show splash, login, registration tree
            return <Unauthenticated route={this.state.url} store={this.props.store} errorMsg={this.state.auth.errorMsg}/>
        }
    }
}