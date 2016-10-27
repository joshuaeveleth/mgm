import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { RegionView } from './RegionView';
import { Region, Estate } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap';

interface regionProps {
    dispatch: (a: Action) => void,
    regions: Map<string, Region>,
    estateMap: Map<string, number>,
    estates: Map<number, Estate>
}

export class RegionList extends React.Component<regionProps, {}> {

    render() {
        let regions = this.props.regions.toList().map((r: Region) => {
            let estateId: number = this.props.estateMap.get(r.uuid);
            let e = this.props.estates.get(estateId);
            return <RegionView key={r.uuid} region={r} estate={e ? e : null}/>
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