import * as React from "react";

import { Job } from '../../../common/messages';

import { Row, Col } from 'react-bootstrap'

export class TaskView extends React.Component<{ task: Job }, {}> {
    render() {
        return (
            <Row>
                <Col md={3}>id</Col>
            </Row>
        )
    }
}