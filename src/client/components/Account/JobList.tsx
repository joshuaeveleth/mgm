import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { JobView } from './JobView';
import { Job } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap'

interface props {
  dispatch: (a: Action) => void,
  jobs: Map<number,Job>
}

export class JobList extends React.Component<props, {}> {
  render() {
    let jobs = this.props.jobs.toList().map((job: Job) => {
      return <JobView key={job.id} job={job} />
    })

    return (
      <Grid>
        <Row>
          <Col md={1}>Task</Col>
          <Col md={2}>Timestamp</Col>
          <Col md={2}>Description</Col>
          <Col md={7}>Status</Col>
        </Row>
        {jobs}
      </Grid>
    )
  }
}