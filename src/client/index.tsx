import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createStore } from 'redux'

import { Authenticated } from "./components/authenticated";
import { Account } from "./components/authenticated/Account";
import { Regions } from "./components/authenticated/Regions";
import { Grid } from "./components/authenticated/Grid";
import { Users } from "./components/authenticated/Users";
import { PendingUsers } from "./components/authenticated/PendingUsers";

import { Unauthenticated } from "./components/unauthenticated";
import { Register } from "./components/unauthenticated/Register";
import { Login } from "./components/unauthenticated/Login";
import { Password } from "./components/unauthenticated/Password";

import { Splash } from "./components/Splash";


import { mgmState } from "./redux/reducers";
let store = createStore(mgmState);

export class Application extends React.Component<{}, {}> {
    render() {
        let state = store.getState();
        if (state.authenticated) {
            // show authenticated tree
            return (
                <Router history={browserHistory}>
                    <Route path="/" component={Authenticated}>
                        <IndexRoute component={Splash}/>
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
                        <IndexRoute component={Splash}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/password" component={Password}/>
                    </Route>
                </Router>
            )
        }
    }
}

ReactDOM.render(<Application />, document.getElementById("app"));
