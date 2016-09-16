import * as React from "react";
import { Link } from 'react-router'

export class Authenticated extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><Link to="/account" activeStyle={{ color: 'red' }}>Account</Link></li>
                    <li><Link to="/regions" activeStyle={{ color: 'red' }}>Regions</Link></li>
                    <li><Link to="/grid" activeStyle={{ color: 'red' }}>Grid</Link></li>
                    <li><Link to="/users" activeStyle={{ color: 'red' }}>Users</Link></li>
                    <li><Link to="/pending" activeStyle={{ color: 'red' }}>Pending Users</Link></li>
                </ul>

                {this.props.children}

            </div>
        )
    }
}
