import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/reducers';

import { Navbar } from 'react-bootstrap';
import { Link } from '../Link';

import { Register } from "./Register";
import { Password } from "./Password";
import { Login } from "./Login";
import { Splash } from "../Splash";

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
        this.state = {
            route: "/"
        };
    }

    componentWillMount() {
        this.urlSub = this.props.store.subscribe(() => {
            console.log('state changed...');
            this.setState({
                route: this.props.store.getState().url
            })
        });
        this.setState({
            route: this.props.store.getState().url
        })
    }
    componentWillUnmount() {
        this.urlSub();
    }

    render() {
        let navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Link className="navbar-brand" href="/" store={this.props.store}>MGM</Link>
                </Navbar.Header>
                <Navbar.Collapse>
                    <ul className="nav navbar-nav">
                        <li><Link href="/password" activeStyle={{ color: 'red' }} store={this.props.store}>Recover Password</Link></li>
                        <li><Link href="/register" activeStyle={{ color: 'red' }} store={this.props.store}>Register</Link></li>
                    </ul>
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
                        <Splash />
                    </div>
                )
        }

    }
}
