import * as React from "react";
import { Action } from "redux";
import { Map, Set } from 'immutable';

import { Group, Role } from '.';
import { GroupView } from './GroupView'

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
    dispatch: (a: Action) => void
    groups: Map<string, Group>
    members: Map<string, Set<string>>
    roles: Map<string, Map<string, Role>>
}

export class GroupList extends React.Component<props, {}> {

    render() {
        let groups = this.props.groups.toList().map((g: Group) => {
            return <GroupView 
            key={g.GroupID} 
            members={this.props.members.get(g.GroupID)} 
            roles={this.props.roles.get(g.GroupID)}
            group={g} />
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