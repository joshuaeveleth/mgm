import * as React from "react";

import { Job } from '../../../common/messages';

import { Row, Col } from 'react-bootstrap'

const monthNames: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export class TaskView extends React.Component<{ job: Job }, {}> {

    timestamptoDate(timestamp: string): string{
        let date = new Date(timestamp);
        return monthNames[date.getMonth()]+' '+date.getDate();
    }

    render() {
        return (
            <Row>
                <Col md={1}>{this.props.job.id}</Col>
                <Col md={1}>{this.timestamptoDate(this.props.job.timestamp)}</Col>
                <Col md={3}>{this.props.job.type}</Col>
                <Col md={7}>{this.props.job.data}</Col>
            </Row>
        )
    }
}