import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { Region } from '../../../common/messages';
import { RegionView } from './RegionView';

import { Grid, Row, Col } from 'react-bootstrap';

interface regionProps {
    dispatch: (a: Action) => void,
    regions: Map<string, Region>
}

export class RegionList extends React.Component<regionProps, {}> {
    render() {
        let regions = this.props.regions.toList().map((r: Region) => {
            return <RegionView key={r.uuid} region={r}/>
        })

        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={3}>Position</Col>
                    <Col md={3}>Estate</Col>
                    <Col md={3}>Host</Col>
                </Row>
                {regions}
            </Grid>
        )
    }
}