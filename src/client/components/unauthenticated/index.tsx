import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';
import { createNavigateToAction } from '../../redux/actions';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { Register } from "./Register";
import { Password } from "./Password";
import { Login } from "./Login";

interface unauthenticatedProps {
    store: Store<mgmState>,
    route: string
}

export class Unauthenticated extends React.Component<unauthenticatedProps, {}> {

    handleNav(href: string) {
        this.props.store.dispatch(createNavigateToAction(href));
    }

    render() {
        let navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand>MGM</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem
                            active={this.props.route === "/login" || this.props.route === "/"}
                            onClick={this.handleNav.bind(this, "/login") }>
                            Log In
                        </NavItem>
                        <NavItem
                            active={this.props.route === "/password"}
                            onClick={this.handleNav.bind(this, "/password") }>
                            Recover Password
                        </NavItem>
                        <NavItem
                            active={this.props.route === "/register"}
                            onClick={this.handleNav.bind(this, "register") }>Register
                        </NavItem>
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
