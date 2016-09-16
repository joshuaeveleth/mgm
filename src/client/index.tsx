import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, browserHistory } from 'react-router';

import { createStore } from 'redux'

import { Authenticated } from "./components/authenticated";
import { Account } from "./components/authenticated/Account";
import { Regions } from "./components/authenticated/Regions";
import { Grid } from "./components/authenticated/Grid";
import { Users } from "./components/authenticated/Users";
import { PendingUsers } from "./components/authenticated/PendingUsers";

import { Unauthenticated } from "./components/unauthenticated";
import { Register } from "./components/unauthenticated/Register";


import { mgmState } from "./redux/reducers";
let store = createStore(mgmState);

export class Application extends React.Component<{}, {}> {
    login() {

    }

    render() {
        let state = store.getState();
        if (state.authenticated) {
            // show authenticated tree
            return (
                <Router history={browserHistory}>
                    <Route path="/" component={Authenticated}>
                        <Route path="/account" component={Account}/>
                        <Route path="/regions" component={Regions}/>
                        <Route path="/grid" component={Grid}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/pending" component={PendingUsers}/>
                    </Route>
                </Router>
            )
        } else {
            // show splash, login, registration tree
            return (
                <Router history={browserHistory}>
                    <Route path="/" component={Unauthenticated}>
                        <Route path="/register" component={Register}/>
                    </Route>
                </Router>
            )
        }
    }
}

ReactDOM.render(<Application />, document.getElementById("app"));
