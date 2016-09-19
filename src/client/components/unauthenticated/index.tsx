import * as React from "react";
import { Link } from 'react-router'
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';

import { Navbar } from 'react-bootstrap';
import { Router, Route, browserHistory } from 'react-router';

import { Register } from "./Register";

interface unauthenticatedProps {
    store: Store<mgmState>
}

export class Unauthenticated extends React.Component<unauthenticatedProps, {}> {
    render() {
        console.log(this.props);
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Toggle />
                        <Link className="navbar-brand" href="/">MGM</Link>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <ul className="nav navbar-nav">
                            <li><Link to="/password" activeStyle={{ color: 'red' }}>Recover Password</Link></li>
                            <li><Link to="/register" activeStyle={{ color: 'red' }}>Register</Link></li>
                        </ul>
                    </Navbar.Collapse>
                </Navbar>

                {this.props.children }

            </div >
        )
    }
}
