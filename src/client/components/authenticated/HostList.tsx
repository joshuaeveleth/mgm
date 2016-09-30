import * as React from "react";

import { Grid, Row, Col } from 'react-bootstrap';

import { Host, Region } from '../../../common/messages'
import { HostView } from './HostView'

interface props {
    hosts: { [key: number]: Host }
    regions: { [key: string]: Region }
}

export class HostList extends React.Component<props, {}> {

    dictToArray(): Host[] {
        let hosts: Host[] = [];
        for (let id in this.props.hosts) {
            hosts.push(this.props.hosts[id]);
        }
        return hosts;
    }
    render() {
        let hosts = this.dictToArray().map((h: Host) => {
            return <HostView key={h.id} host={h} regions={this.props.regions} />
        })
        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={3}>Address</Col>
                    <Col md={1}>Regions</Col>
                    <Col md={5}>Performance</Col>
                </Row>
                {hosts}
            </Grid>
        );
    }
}