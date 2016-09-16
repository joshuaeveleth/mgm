import * as React from "react";
import { Link } from 'react-router'

import { Router, Route, browserHistory } from 'react-router';

import { Register } from "./Register";

export class Unauthenticated extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><Link to="/register" activeStyle={{ color: 'red' }}>Register</Link></li>
                </ul>

                {this.props.children}

            </div>
        )
    }
}
