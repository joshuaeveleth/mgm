import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from '../Link';

import { Register } from "./Register";
import { Password } from "./Password";
import { Login } from "./Login";

interface unauthenticatedProps {
    store: Store<mgmState>
}

export class Unauthenticated extends React.Component<unauthenticatedProps, {}> {
    private urlSub: Redux.Unsubscribe;
    state: {
        route: string
    }

    constructor(props: unauthenticatedProps){
        super(props);
        this.urlSub = this.props.store.subscribe(() => {
            this.setState({
                route: this.props.store.getState().url
            })
        });
        this.state = {
            route: this.props.store.getState().url
        };
    }

    componentWillUnmount() {
        this.urlSub();
    }

    render() {
        let navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand><Link href="/" store={this.props.store}>MGM</Link></Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem><Link href="/password" activeStyle={{ color: 'red' }} store={this.props.store}>Recover Password</Link></NavItem>
                        <NavItem><Link href="/register" activeStyle={{ color: 'red' }} store={this.props.store}>Register</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        switch (this.state.route) {
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
