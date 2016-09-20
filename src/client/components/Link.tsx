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
    private sub: Redux.Unsubscribe;
    state: {
        username: string
        password: string
        errorMsg: string
    }

    constructor(props: LinkProps){
        super(props);
        this.sub = this.props.store.subscribe(() => {
            this.setState({
                route: this.props.store.getState().url
            })
        });
        this.state = {
            username: '', password: '', errorMsg: ''
        };
    }

    componentWillUnmount() {
        this.sub();
    }

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