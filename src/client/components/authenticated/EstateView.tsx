import * as React from "react";
import { Map } from 'immutable';

import { EstateRecord } from '../../redux/model';
import { User } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  estate: EstateRecord
  users: Map<string,User>
}

export class EstateView extends React.Component<props, {}> {

  render() {
    let estateOwner = '';
    if(this.props.estate.estate.EstateOwner && this.props.users.get(this.props.estate.estate.EstateOwner))
      estateOwner = this.props.users.get(this.props.estate.estate.EstateOwner).name;
    return (
      <Row>
        <Col md={3}>{this.props.estate.estate.EstateName}</Col>
        <Col md={1}>{this.props.estate.regions.length}</Col>
        <Col md={3}>{estateOwner}</Col>
        <Col md={5}>{this.props.estate.managers}</Col>
      </Row>
    )
  }
}
