import * as React from "react";
import { Action } from 'redux'
import { StateModel } from '../redux/model';
import { createLogoutAction, createNavigateToAction } from '../redux/actions';
import { Map } from 'immutable';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';

import { Account } from "./Account/Account";
import { RegionList } from "./Regions/RegionList";
import { EstateList } from './Estates/EstateList';
import { GroupList } from './Groups/GroupList';
import { HostList } from './Hosts/HostList';
import { UserList } from "./Users/UserList";
import { PendingUserList } from "./PendingUsers/PendingUserList";

interface authenticatedProps {
    dispatch: (a: Action) => void,
    state: StateModel
}

export class Authenticated extends React.Component<authenticatedProps, {}> {
    state: {
        url: string
    }

    constructor(props: authenticatedProps) {
        super(props);
        this.state = {
            url: props.state.url
        }
    }

    shouldComponentUpdate(nextProps: authenticatedProps, nextState: { url: string }) {
        return nextProps.state !== this.props.state || this.state.url !== nextState.url;
    }

    componentWillReceiveProps(newProps: authenticatedProps) {
        if (this.state.url !== newProps.state.url) {
            this.setState({
                url: newProps.state.url
            })
        }
    }

    handleLogout() {
        this.props.dispatch(createLogoutAction());
    }

    handleNav(href: string) {
        this.props.dispatch(createNavigateToAction(href));
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
                            active={this.state.url === "/account" || this.state.url === "/"}
                            onClick={this.handleNav.bind(this, "/account")}>
                            Account
                        </NavItem>
                        <NavItem
                            active={this.state.url === "/regions"}
                            onClick={this.handleNav.bind(this, "/regions")}>
                            Regions
                        </NavItem>
                        <NavDropdown id="grid-dropdown" title="Grid">
                            <MenuItem active={this.state.url === "/estates"}
                                onClick={this.handleNav.bind(this, "/estates")}>
                                Estates
                            </MenuItem>
                            <MenuItem active={this.state.url === "/groups"}
                                onClick={this.handleNav.bind(this, "/groups")}>
                                Groups
                            </MenuItem>
                            <MenuItem active={this.state.url === "/hosts"}
                                onClick={this.handleNav.bind(this, "/hosts")}>
                                Hosts
                            </MenuItem>
                        </NavDropdown>
                        <NavItem
                            active={this.state.url === "/users"}
                            onClick={this.handleNav.bind(this, "/users")}>
                            Users
                        </NavItem >
                        <NavItem
                            active={this.state.url === "/pending"}
                            onClick={this.handleNav.bind(this, "/pending")}>
                            Pending Users
                        </NavItem >
                    </Nav >
                    <Nav pullRight>
                        <NavItem><Button bsSize="xsmall" onClick={this.handleLogout.bind(this)}>Log Out</Button></NavItem>
                    </Nav>
                </Navbar.Collapse >
            </Navbar >
        )
        switch (this.state.url) {
            case '/regions':
                return (
                    <div>
                        {navbar}
                        <RegionList
                            dispatch={this.props.dispatch}
                            regions={this.props.state.regions}
                            estateMap={this.props.state.estateMap}
                            estates={this.props.state.estates} />
                    </div>
                )
            case '/estates':
                return (
                    <div>
                        {navbar}
                        <EstateList
                            dispatch={this.props.dispatch}
                            estates={this.props.state.estates}
                            estateMap={this.props.state.estateMap}
                            managers={this.props.state.managers}
                            users={this.props.state.users} />
                    </div>
                )
            case '/groups':
                return (
                    <div>
                        {navbar}
                        <GroupList
                            dispatch={this.props.dispatch}
                            groups={this.props.state.groups}
                            roles={this.props.state.roles}
                            members={this.props.state.members} />
                    </div>
                )
            case '/hosts':
                return (
                    <div>
                        {navbar}
                        <HostList
                            dispatch={this.props.dispatch}
                            hosts={this.props.state.hosts}
                            regions={this.props.state.regions} />
                    </div>
                )
            case '/users':
                return (
                    <div>
                        {navbar}
                        <UserList
                            dispatch={this.props.dispatch}
                            users={this.props.state.get('users')} />
                    </div>
                )
            case '/pending':
                return (
                    <div>
                        {navbar}
                        <PendingUserList
                            dispatch={this.props.dispatch}
                            users={this.props.state.pendingUsers} />
                    </div>
                )
            default:
                return (
                    <div>
                        {navbar}
                        <Account
                            dispatch={this.props.dispatch}
                            user={this.props.state.get('auth').user}
                            jobs={this.props.state.get('jobs')} />
                    </div>
                )
        }
    }
}