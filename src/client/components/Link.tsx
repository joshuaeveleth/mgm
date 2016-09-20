import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../redux/reducers'
import { navigateTo } from "../redux/actions"

export interface LinkProps {
    href: string,
    activeStyle?: {},
    className?: string,
    store: Store<mgmState>
}

export class Link extends React.Component<LinkProps, {}> {

    handleClick() {
        this.props.store.dispatch(navigateTo(this.props.href));
    }

    render() {
        return (
            <div
                className={this.props.className}
                
                onClick={this.handleClick.bind(this) }>
                {this.props.children}
            </div>
        )
    }
}