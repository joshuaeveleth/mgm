import * as React from "react";
import { Store } from 'redux'
import { PendingUser } from '.';
const shallowequal = require('shallowequal');

import { Grid, Row, Col } from 'react-bootstrap';

interface PUProps {
  user: PendingUser
}

export class PendingUserView extends React.Component<PUProps, {}> {

  shouldComponentUpdate(nextProps: PUProps) {
        return !shallowequal(this.props, nextProps);
    }

  render() {
    return (
      <Row>
        <Col md={3}>{this.props.user.name}</Col>
        <Col md={3}>{this.props.user.email}</Col>
        <Col md={3}>{this.props.user.registered}</Col>
        <Col md={3}>{this.props.user.summary}</Col>
      </Row>
    )
  }
}