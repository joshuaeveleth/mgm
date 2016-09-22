import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../redux/model'
import { navigateTo } from "../redux/actions"

export interface LinkProps {
    href: string,
    route: string,
    className?: string,
    store: Store<mgmState>
}

export class Link extends React.Component<LinkProps, {}> {
    state: {
        username: string
        password: string
        errorMsg: string
    }

    constructor(props: LinkProps) {
        super(props);
        this.state = {
            username: '', password: '', errorMsg: ''
        };
    }

    handleClick() {
        this.props.store.dispatch(navigateTo(this.props.href));
    }

    render() {
        return (
            <div
                className={this.props.className ? this.props.className : ''}
                onClick={this.handleClick.bind(this) }>
                {this.props.children}
            </div>
        )
    }
}