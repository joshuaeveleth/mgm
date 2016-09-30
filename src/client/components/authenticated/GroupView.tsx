import * as React from "react";

import { GroupRecord } from '../../redux/model';
import { Role } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  group: GroupRecord
}

export class GroupView extends React.Component<props, {}> {

  render() {
    let roles = this.props.group.roles.map( (m: Role) => {
      return <span key={m.RoleID}>{m.Name} </span>
    });
    return (
      <Row>
        <Col md={3}>{this.props.group.group.Name}</Col>
        <Col md={3}>{this.props.group.group.FounderID}</Col>
        <Col md={1}>{this.props.group.members.length}</Col>
        <Col md={5}>{roles}</Col>
      </Row>
    )
  }
}
