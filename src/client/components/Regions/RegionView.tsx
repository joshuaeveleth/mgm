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

  start(){
    alertify.log('Start Region not implemented yet');
  }

  render() {
    return (
      <Row>
        <Col md={2}><i className="fa fa-cog" aria-hidden="true" onClick={this.props.onManage}></i>   {this.props.region.name}</Col>
        <Col md={2}>{this.props.estate ? this.props.estate.EstateName : '~'}</Col>
        <Col md={1}>
          <i className="fa fa-play" aria-hidden="true" onClick={this.start.bind(this)}></i>
        </Col>
        <Col md={7}> ~~ performance view ~~ </Col>
      </Row>
    )
  }
}