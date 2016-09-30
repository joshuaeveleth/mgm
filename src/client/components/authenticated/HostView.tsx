import * as React from "react";

import { Host, Region } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  host: Host
  regions: {[key:string]: Region }
}

export class HostView extends React.Component<props, {}> {

  render() {
    let regionCount = 0;
    for(let id in this.props.regions){
      if(this.props.regions[id].slaveAddress === this.props.host.address)
        regionCount++;
    }
    return (
      <Row>
        <Col md={3}>{this.props.host.name}</Col>
        <Col md={3}>{this.props.host.address}</Col>
        <Col md={1}>{regionCount}</Col>
        <Col md={5}>~~performance~~</Col>
      </Row>
    )
  }
}
