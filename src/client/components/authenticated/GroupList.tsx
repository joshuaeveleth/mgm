import * as React from "react";
import { Action } from "redux";
import { Map } from 'immutable';

import { Group } from '../../redux/model';
import { GroupView } from './GroupView'

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
    dispatch: (a: Action) => void
    groups: Map<string, Group>
}

export class GroupList extends React.Component<props, {}> {

    render() {
        let groups = this.props.groups.toList().map((g: Group) => {
            return <GroupView key={g.GroupID} group={g} />
        })
        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={3}>Founder</Col>
                    <Col md={1}>Membership</Col>
                    <Col md={5}>Roles</Col>
                </Row>
                {groups}
            </Grid>
        );
    }
}