import * as React from "react";
import { Action } from 'redux'

import { Region } from '../../../common/messages';
import { RegionView } from './RegionView';

import { Grid, Row, Col } from 'react-bootstrap';

interface regionProps {
    dispatch: (a: Action) => void,
    regions: {[key:string]: Region}
}

export class RegionList extends React.Component<regionProps, {}> {

    pullRegionsFromStore(): Region[] {
        let regions: Region[] = [];
        let state = this.props.regions;
        for (let uuid in state) {
            regions.push(state[uuid]);
        }
        return regions;
    }

    render() {
        let regions = this.pullRegionsFromStore().map( (r:Region) => {
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