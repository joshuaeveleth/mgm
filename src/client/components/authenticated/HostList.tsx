import * as React from "react";
import { Action } from 'redux';

import { createRequestCreateHostAction } from '../../redux/actions';

import { Grid, Row, Col, Button } from 'react-bootstrap';

import { Host, Region } from '../../../common/messages';
import { HostView } from './HostView';
import { HostAddModal } from './HostAdd';

interface props {
    dispatch: (a: Action) => void,
    hosts: { [key: number]: Host }
    regions: { [key: string]: Region }
}

export class HostList extends React.Component<props, {}> {
    state: {
        showAdd: boolean
    }
    constructor(props: props) {
        super(props);
        this.state = {
            showAdd: false
        }
    }
    showAddHost() {
        this.setState({
            showAdd: true
        })
    }

    onNewHost(address: string) {
        this.props.dispatch(createRequestCreateHostAction(address));
        this.setState({
            showAdd: false
        })
    }
    cancelNewHost() {
        this.setState({
            showAdd: false
        })
    }


    render() {
        let hosts = Object.keys(this.props.hosts).map((idx: any) => {
            let h: Host = this.props.hosts[idx];
            return <HostView key={h.id} host={h} regions={this.props.regions} dispatch={this.props.dispatch} />
        });
        let addHost = <span />
        if (this.state.showAdd) {
            addHost = <HostAddModal
                cancel={this.cancelNewHost.bind(this) }
                submit={this.onNewHost.bind(this) }/>;
        }


        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={3}>Address</Col>
                    <Col md={1}>Regions</Col>
                    <Col md={4}>Performance</Col>
                    <Col md={1}><Button onClick={this.showAddHost.bind(this) }>Add Host</Button></Col>
                </Row>
                { hosts }
                { addHost }
            </Grid >
        );
    }
}