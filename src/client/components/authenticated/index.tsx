import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';
import { logoutAction } from '../../redux/actions';

import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from '../Link';

import { Account } from "./Account";
import { Regions } from "./Regions";
import { Grid } from "./Grid";
import { Users } from "./Users";
import { PendingUsers } from "./PendingUsers";

interface authenticatedProps {
    store: Store<mgmState>,
    route: string
}

export class Authenticated extends React.Component<authenticatedProps, {}> {

    handleLogout() {
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
                        <NavItem active={this.props.route === "/account" || this.props.route === "/"}><Link href="/account" route={this.props.route} store={this.props.store}>Account</Link></NavItem>
                        <NavItem active={this.props.route === "/regions"}><Link href="/regions" route={this.props.route} store={this.props.store}>Regions</Link></NavItem>
                        <NavItem active={this.props.route === "/grid"}><Link href="/grid" route={this.props.route} store={this.props.store}>Grid</Link></NavItem>
                        <NavItem active={this.props.route === "/users"}><Link href="/users" route={this.props.route} store={this.props.store}>Users</Link></NavItem>
                        <NavItem active={this.props.route === "/pending"}><Link href="/pending" route={this.props.route} store={this.props.store}>Pending Users</Link></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem><Button bsSize="small" onClick={this.handleLogout.bind(this) }>Log Out</Button></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        switch (this.props.route) {
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
