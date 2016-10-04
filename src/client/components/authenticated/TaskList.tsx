import * as React from "react";
import { Action } from 'redux'

import { TaskView } from './TaskView';
import { Job } from '../../../common/messages';

import { Grid, Row, Col } from 'react-bootstrap'

interface props {
  dispatch: (a: Action) => void,
  jobs: { [key: number]: Job }
}

export class TaskList extends React.Component<props, {}> {
  render() {
    let jobs = Object.keys(this.props.jobs).map((idx: any) => {
      let job: Job = this.props.jobs[idx];
      return <TaskView key={job.id} job={job} />
    })

    return (
      <Grid>
        <Row>
          <Col md={1}>Task</Col>
          <Col md={1}>Timestamp</Col>
          <Col md={3}>Description</Col>
          <Col md={7}>Status</Col>
        </Row>
        {jobs}
      </Grid>
    )
  }
}