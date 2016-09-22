import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from '../Link';

import { Register } from "./Register";
import { Password } from "./Password";
import { Login } from "./Login";

interface unauthenticatedProps {
    store: Store<mgmState>,
    route: string
}

export class Unauthenticated extends React.Component<unauthenticatedProps, {}> {

    render() {
        let navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand><Link href="/" route={this.props.route} store={this.props.store}>MGM</Link></Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem active={this.props.route === "/login" || this.props.route === "/"}><Link href="/login" route={this.props.route} store={this.props.store}>Log In</Link></NavItem>
                        <NavItem active={this.props.route === "/password"}><Link href="/password" route={this.props.route} store={this.props.store}>Recover Password</Link></NavItem>
                        <NavItem active={this.props.route === "/register"}><Link href="/register" route={this.props.route} store={this.props.store}>Register</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        switch (this.props.route) {
            case '/password':
                return (
                    <div>
                        {navbar}
                        <Password />
                    </div>
                )
            case '/register':
                return (
                    <div>
                        {navbar}
                        <Register />
                    </div>
                )
            default:
                return (
                    <div>
                        {navbar}
                        <Login store={this.props.store}/>
                    </div>
                )
        }
    }
}
