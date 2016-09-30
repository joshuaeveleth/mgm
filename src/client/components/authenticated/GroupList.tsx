import * as React from "react";
import { Action } from "redux";

import { GroupRecord } from '../../redux/model';
import { GroupView } from './GroupView'

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
    dispatch: (a: Action) => void
    groups: { [key: string]: GroupRecord }
}

export class GroupList extends React.Component<props, {}> {

    pullGroupsFromProps(): GroupRecord[] {
        let groups: GroupRecord[] = [];
        for (let id in this.props.groups) {
            if (this.props.groups[id].group)
                groups.push(this.props.groups[id]);
        }
        return groups;
    }
    render() {
        let groups = this.pullGroupsFromProps().map((g: GroupRecord) => {
            return <GroupView key={g.group.GroupID} group={g} />
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