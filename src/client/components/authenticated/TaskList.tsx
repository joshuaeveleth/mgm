import * as React from "react";
import { Action } from 'redux'

import { TaskView } from './TaskView';
import { Job } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap'

interface props {
  dispatch: (a: Action) => void,
  tasks: { [key: number]: Job }
}

export class TaskList extends React.Component<props, {}> {
  render() {
    let tasks = Object.keys(this.props.tasks).map((idx: any) => {
      let task: Job = this.props.tasks[idx];
      return <TaskView key={task.id} task={task} />
    })

    return (
      <Grid>
        <Row>
          <Col md={1}>Task</Col>
          <Col md={1}>Timestamp</Col>
          <Col md={3}>Description</Col>
          <Col md={7}>Status</Col>
        </Row>
        {tasks}
      </Grid>
    )
  }
}