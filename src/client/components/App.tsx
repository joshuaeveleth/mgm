import * as React from "react";
import { Store } from 'redux'
import { Map } from 'immutable';

import { StateModel } from '../redux/model';

import { Authenticated } from "./Authenticated";
import { Unauthenticated } from "./Unauthenticated";

interface appProps {
    store: Store<StateModel>
}

export class App extends React.Component<appProps, {}> {
    private sub: Redux.Unsubscribe;
    state: {
        st: StateModel
    };

    constructor(props: appProps) {
        super(props);
        this.sub = this.props.store.subscribe(() => {
            if (this.state.st !== this.props.store.getState()) {
                this.setState({
                    st: this.props.store.getState()
                });
            }
        });
        this.state = {
            st: this.props.store.getState()
        }
    }

    render() {
        if (this.state.st.auth.loggedIn) {
            // show authenticated tree
            return <Authenticated state={this.state.st} dispatch={ this.props.store.dispatch } />
        } else {
            // show splash, login, registration tree
            return <Unauthenticated route={this.state.st.url} dispatch={ this.props.store.dispatch } errorMsg={this.state.st.auth.errorMsg}/>
        }
    }
}