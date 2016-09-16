import * as React from "react";
import * as ReactDOM from "react-dom";

import { Router, Route, browserHistory } from 'react-router';

import { Authenticated } from "./components/Authenticated";

import { Account } from "./components/Account";
import { Regions } from "./components/Regions";
import { Grid } from "./components/Grid";
import { Users } from "./components/Users";
import { PendingUsers } from "./components/PendingUsers";

export class Application extends React.Component<{}, {}> {
    render() {
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
    }
}

ReactDOM.render(<Application />, document.getElementById("app"));
