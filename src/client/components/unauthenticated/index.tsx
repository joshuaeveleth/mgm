import * as React from "react";
import { Link } from 'react-router'

import { Navbar } from 'react-bootstrap';

import { Router, Route, browserHistory } from 'react-router';

import { Register } from "./Register";

export class Unauthenticated extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Toggle />
                        <Link className="navbar-brand" href="/">MGM</Link>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <ul className="nav navbar-nav">
                            <li><Link to="/login" activeStyle={{ color: 'red' }}>Log In</Link></li>
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
