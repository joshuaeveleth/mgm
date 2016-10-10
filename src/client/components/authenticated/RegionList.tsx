import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { Region, Estate } from '../../../common/messages';
import { RegionView } from './RegionView';
import { EstateRecord } from '../../redux/model';

import { Grid, Row, Col } from 'react-bootstrap';

interface regionProps {
    dispatch: (a: Action) => void,
    regions: Map<string, Region>,
    estates: Map<number, EstateRecord>
}

export class RegionList extends React.Component<regionProps, {}> {

    render() {
        let regions = this.props.regions.toList().map((r: Region) => {
            let er = this.props.estates.get(r.estateID);
            return <RegionView key={r.uuid} region={r} estate={er ? er.estate : null}/>
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