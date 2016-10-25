import * as React from "react";
import { Map, Set, Iterable } from 'immutable';

import { Estate, User } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  estate: Estate
  users: Map<string, User>
  managers: Set<string>
  regionCount: number
}

export class EstateView extends React.Component<props, {}> {

  render() {
    let estateOwner = '';
    if (this.props.estate.EstateOwner && this.props.users.get(this.props.estate.EstateOwner))
      estateOwner = this.props.users.get(this.props.estate.EstateOwner).name;
    let managers: Iterable<string, JSX.Element>;
    if (this.props.managers) {
      managers = this.props.managers.map((uuid) => {
        if (this.props.users.get(uuid)) {
          return <span>{this.props.users.get(uuid).name}</span>
        }
      })
    }
    return (
      <Row>
        <Col md={3}>{this.props.estate.EstateName}</Col>
        <Col md={1}>{this.props.regionCount}</Col>
        <Col md={3}>{estateOwner}</Col>
        <Col md={5}>{managers}</Col>
      </Row>
    )
  }
}
