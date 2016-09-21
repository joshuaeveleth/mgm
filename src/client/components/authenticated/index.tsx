import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';
import { logoutAction } from '../../redux/actions';

import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from '../Link';

import { Account } from "./Account";
import { Regions } from "./Regions";
import { Grid } from "./Grid";
import { Users } from "./Users";
import { PendingUsers } from "./PendingUsers";

interface authenticatedProps {
    store: Store<mgmState>
}

export class Authenticated extends React.Component<authenticatedProps, {}> {
    private urlSub: Redux.Unsubscribe;
    state: {
        route: string
    }

    constructor(props: authenticatedProps){
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

    handleLogout(){
        this.props.store.dispatch(logoutAction());
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
                        <NavItem><Link href="/account" activeStyle={{ color: 'red' }} store={this.props.store}>Account</Link></NavItem>
                        <NavItem><Link href="/regions" activeStyle={{ color: 'red' }} store={this.props.store}>Regions</Link></NavItem>
                        <NavItem><Link href="/grid" activeStyle={{ color: 'red' }} store={this.props.store}>Grid</Link></NavItem>
                        <NavItem><Link href="/users" activeStyle={{ color: 'red' }} store={this.props.store}>Users</Link></NavItem>
                        <NavItem><Link href="/pending" activeStyle={{ color: 'red' }} store={this.props.store}>Pending Users</Link></NavItem>
                        <NavItem><Button onClick={this.handleLogout.bind(this)}>Log Out</Button></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        switch (this.state.route) {
            case '/regions':
                return (
                    <div>
                        {navbar}
                        <Regions />
                    </div>
                )
            case '/grid':
                return (
                    <div>
                        {navbar}
                        <Grid />
                    </div>
                )
            case '/users':
                return (
                    <div>
                        {navbar}
                        <Users />
                    </div>
                )
            case '/pending':
                return (
                    <div>
                        {navbar}
                        <PendingUsers />
                    </div>
                )
            default:
                return (
                    <div>
                        {navbar}
                        <Account />
                    </div>
                )
        }
    }
}
