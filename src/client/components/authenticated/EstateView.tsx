import * as React from "react";
import { Map } from 'immutable';

import { Estate, User } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  estate: Estate
  users: Map<string,User>
}

export class EstateView extends React.Component<props, {}> {

  render() {
    let estateOwner = '';
    if(this.props.estate.EstateOwner && this.props.users.get(this.props.estate.EstateOwner))
      estateOwner = this.props.users.get(this.props.estate.EstateOwner).name;
    return (
      <Row>
        <Col md={3}>{this.props.estate.EstateName}</Col>
        <Col md={1}>{/*this.props.estate.regions.length*/}~~~</Col>
        <Col md={3}>{estateOwner}</Col>
        <Col md={5}>{/*this.props.estate.managers*/}~~~</Col>
      </Row>
    )
  }
}
