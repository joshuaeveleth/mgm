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

                <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <tbody>
                        <tr>
                            <td><h1>MGM</h1></td>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; </td>
                            <td>
                                <form>
                                    <strong>Error Message</strong>
                                    <label className="sr-only">Username</label>
                                    <input placeholder="Avatar Name" size="10"></input>
                                    <label className="sr-only">Password</label>
                                    <input placeholder="Password" size="10" type="password"></input>
                                    <button type="submit" className="btn btn-success">Login</button>
                                </form>
                            </td>
                            <td>
                                <button className="btn btn-success" >Forgot Password?</button>
                            </td>
                            <td>
                                <a className="btn btn-success">Register</a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {this.props.children}

            </div>
        )
    }
}
