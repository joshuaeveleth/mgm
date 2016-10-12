import * as React from "react";

import { Group } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  group: Group
}

export class GroupView extends React.Component<props, {}> {

  render() {
    let roles = '~~~';/*this.props.group.roles.map( (m: Role) => {
      return <span key={m.RoleID}>{m.Name} </span>
    });*/
    return (
      <Row>
        <Col md={3}>{this.props.group.Name}</Col>
        <Col md={3}>{this.props.group.FounderID}</Col>
        <Col md={1}>{/*this.props.group.members.length*/}~~~</Col>
        <Col md={5}>{roles}</Col>
      </Row>
    )
  }
}
