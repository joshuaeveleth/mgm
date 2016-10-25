import * as React from "react";
import { Map, Set, Iterable } from 'immutable';

import { Group, Role } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  group: Group
  members: Set<string>
  roles: Map<string, Role>
}

export class GroupView extends React.Component<props, {}> {

  render() {
    let roles: JSX.Element[];
    if (this.props.roles) {
      roles = this.props.roles.toArray().map((m: Role) => {
        return <span key={m.RoleID}>{m.Name} </span>
      });
    }
    return (
      <Row>
        <Col md={3}>{this.props.group.Name}</Col>
        <Col md={3}>{this.props.group.FounderID}</Col>
        <Col md={1}>{this.props.members ? this.props.members.size : 0}</Col>
        <Col md={5}>{roles}</Col>
      </Row>
    )
  }
}
