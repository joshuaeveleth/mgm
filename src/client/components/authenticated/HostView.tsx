import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { createRequestDeleteHostAction } from '../../redux/actions'
import { Host, Region } from '../../redux/model'

import { Grid, Row, Col, Button } from 'react-bootstrap';

interface props {
  dispatch: (a: Action) => void,
  host: Host
  regions: Map<string,Region>
}

export class HostView extends React.Component<props, {}> {

  onRemoveHost() {
    let regionCount = 0;
    this.props.regions.toList().map( (r: Region) => {
      if(r.slaveAddress === this.props.host.address)
        regionCount++;
    })
    if (regionCount != 0){
        return alertify.error('Cannot remove host ' + this.props.host.address + ', there are ' + regionCount + ' regions assigned');
    }
    alertify.confirm('Are you sure you want to remove host ' + this.props.host.address + '?', () => {
      this.props.dispatch(createRequestDeleteHostAction(this.props.host));
    });
  }

  render() {
    let regionCount = 0;
    this.props.regions.toList().map( (r: Region) => {
      if(r.slaveAddress === this.props.host.address)
        regionCount++;
    })
    return (
      <Row>
        <Col md={3}>{this.props.host.name}</Col>
        <Col md={3}>{this.props.host.address}</Col>
        <Col md={1}>{regionCount}</Col>
        <Col md={4}>~~performance~~</Col>
        <Col md={1}><Button bsSize='xsmall' onClick={this.onRemoveHost.bind(this)} >Remove {this.props.host.address}</Button></Col>
      </Row>
    )
  }
}
