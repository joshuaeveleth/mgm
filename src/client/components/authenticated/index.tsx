import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';
import { createLogoutAction, createNavigateToAction } from '../../redux/actions';

import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

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
        this.props.store.dispatch(createLogoutAction());
    }

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
                            active={this.props.route === "/account" || this.props.route === "/"}
                            onClick={this.handleNav.bind(this, "/account") }>
                            Account
                        </NavItem>
                        <NavItem
                            active={this.props.route === "/regions"}
                            onClick={this.handleNav.bind(this, "/regions") }>
                            Regions
                        </NavItem>
                        <NavItem
                            active={this.props.route === "/grid"}
                            onClick={this.handleNav.bind(this, "/grid") }>
                            Grid
                        </NavItem>
                        <NavItem
                            active={this.props.route === "/users"}
                            onClick={this.handleNav.bind(this, "/users") }>
                            Users
                        </NavItem >
                        <NavItem
                            active={this.props.route === "/pending"}
                            onClick={this.handleNav.bind(this, "/pending") }>
                            Pending Users
                        </NavItem >
                    </Nav >
                    <Nav pullRight>
                        <NavItem><Button bsSize="xsmall" onClick={this.handleLogout.bind(this) }>Log Out</Button></NavItem>
                    </Nav>
                </Navbar.Collapse >
            </Navbar >
        )
        switch (this.props.route) {
            case '/regions':
                return (
                    <div>
                        {navbar}
                        <Regions store={this.props.store}/>
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
                        <Account store={this.props.store}/>
                    </div>
                )
        }
    }
}
