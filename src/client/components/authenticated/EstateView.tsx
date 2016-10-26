import * as React from "react";
import { Action } from 'redux'
import { Map, Set, Iterable } from 'immutable';

import { Estate, User } from '../../redux/model';
import { createRequestDeleteEstateAction } from '../../redux/actions';

import { Grid, Row, Col, Button } from 'react-bootstrap';

interface props {
  dispatch: (a: Action) => void,
  estate: Estate
  users: Map<string, User>
  managers: Set<string>
  regionCount: number
}

export class EstateView extends React.Component<props, {}> {

  onRemoveEstate(){
    if (this.props.regionCount != 0){
        return alertify.error('Cannot remove Estate ' + this.props.estate.EstateName + ', there are ' + this.props.regionCount + ' regions assigned');
    }
    alertify.confirm('Are you sure you want to remove host ' + this.props.estate.EstateName + '?', () => {
      this.props.dispatch(createRequestDeleteEstateAction(this.props.estate.EstateID, this.props.estate.EstateName));
    });
  }

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
        <Col md={4}>{managers}</Col>
        <Col md={1}><Button bsSize='xsmall' onClick={this.onRemoveEstate.bind(this)} >Remove</Button></Col>
      </Row>
    )
  }
}
