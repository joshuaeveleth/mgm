import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

import { Region } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap';

interface regionProps {
  region: Region
}

export class RegionView extends React.Component<regionProps, {}> {

  render() {
    return (
      <Row>
        <Col md={3}>{this.props.region.name}</Col>
        <Col md={3}>X: {this.props.region.locX} Y: {this.props.region.locY}</Col>
        <Col md={3}>Estate</Col>
        <Col md={3}>{this.props.region.slaveAddress}</Col>
      </Row>
    )
  }
}