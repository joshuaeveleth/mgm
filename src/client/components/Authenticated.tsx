import * as React from "react";
import { Action } from 'redux'
import { mgmState } from '../redux/model';
import { createLogoutAction, createNavigateToAction } from '../redux/actions';
import { Map } from 'immutable';

import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import { Account } from "./authenticated/Account";
import { RegionList } from "./authenticated/RegionList";
import { Grid } from "./authenticated/Grid";
import { UserList } from "./authenticated/UserList";
import { PendingUserList } from "./authenticated/PendingUserList";

interface authenticatedProps {
    dispatch: (a: Action) => void,
    state: Map<string,any>
}

export class Authenticated extends React.Component<authenticatedProps, {}> {
    state: {
        url: string
    }

    constructor(props: authenticatedProps) {
        super(props);
        this.state = {
            url: props.state.get('url')
        }
    }

    shouldComponentUpdate(nextProps: authenticatedProps, nextState: { url: string }) {
        return nextProps.state !== this.props.state || this.state.url !== nextState.url;
    }

    componentWillReceiveProps(newProps: authenticatedProps) {
        if (this.state.url !== newProps.state.get('url')) {
            this.setState({
                url: newProps.state.get('url')
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
                            onClick={this.handleNav.bind(this, "/account") }>
                            Account
                        </NavItem>
                        <NavItem
                            active={this.state.url === "/regions"}
                            onClick={this.handleNav.bind(this, "/regions") }>
                            Regions
                        </NavItem>
                        <NavItem
                            active={this.state.url === "/grid"}
                            onClick={this.handleNav.bind(this, "/grid") }>
                            Grid
                        </NavItem>
                        <NavItem
                            active={this.state.url === "/users"}
                            onClick={this.handleNav.bind(this, "/users") }>
                            Users
                        </NavItem >
                        <NavItem
                            active={this.state.url === "/pending"}
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
        switch (this.state.url) {
            case '/regions':
                return (
                    <div>
                        {navbar}
                        <RegionList 
                            dispatch={this.props.dispatch} 
                            regions={this.props.state.get('regions')}
                            estates={this.props.state.get('estates')} />
                    </div>
                )
            case '/grid':
                return (
                    <div>
                        {navbar}
                        <Grid
                            dispatch={this.props.dispatch}
                            estates={this.props.state.get('estates')}
                            hosts={this.props.state.get('hosts')}
                            groups={this.props.state.get('groups')}
                            users={this.props.state.get('users')}
                            regions={this.props.state.get('regions')} />
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
                            dispatch={ this.props.dispatch }
                            users={this.props.state.get('pendingUsers') }/>
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
