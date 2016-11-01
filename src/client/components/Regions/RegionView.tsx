import * as React from "react";
import { Store } from 'redux'
import { Estate } from '../Estates';
import { Region } from '.';

import { Grid, Row, Col, Button } from 'react-bootstrap';

interface regionProps {
  region: Region,
  estate: Estate,
  onManage: () => void
}

export class RegionView extends React.Component<regionProps, {}> {

  render() {
    return (
      <Row>
        <Col md={1}><Button bsSize='xsmall' onClick={this.props.onManage} >
          <i className="fa fa-cog" aria-hidden="true"></i>
        </Button></Col>
        <Col md={2}>{this.props.region.name}</Col>
        <Col md={3}>X: {this.props.region.locX}Y: {this.props.region.locY}</Col>
        <Col md={3}>{this.props.estate ? this.props.estate.EstateName : '~'}</Col>
        <Col md={3}>{this.props.region.slaveAddress}</Col>
      </Row>
    )
  }
}