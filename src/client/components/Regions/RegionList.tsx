import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { RegionView } from './RegionView';
import { Estate } from '../Estates';
import { Region } from '.';

import { ManageModal } from './Manage';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
    dispatch: (a: Action) => void,
    regions: Map<string, Region>,
    estateMap: Map<string, number>,
    estates: Map<number, Estate>
}

export class RegionList extends React.Component<props, {}> {
    state: {
        showManage: boolean
        selectedRegion: Region
    }

    constructor(p: props){
        super(p);
        this.state = {
            showManage: false,
            selectedRegion: null
        }
    }

    onManageRegion(r: Region) {
        this.setState({
            showManage: true,
            selectedRegion: r
        })
    }

    dismissManage(){
        this.setState({
            showManage: false
        })
    }

    render() {
        let regions = this.props.regions.toList().map((r: Region) => {
            let estateId: number = this.props.estateMap.get(r.uuid);
            let e = this.props.estates.get(estateId);
            return <RegionView
                key={r.uuid}
                region={r}
                estate={e ? e : null}
                onManage={this.onManageRegion.bind(this, r)} />
        })

        return (
            <Grid>
                <Row>
                    <Col md={2}>Name</Col>
                    <Col md={2}>Estate</Col>
                    <Col md={1}>Controls</Col>
                </Row>
                {regions}
                { this.state.showManage ? <ManageModal dismiss={this.dismissManage.bind(this)} region={this.state.selectedRegion}/> : <span />}
            </Grid>
        )
    }
}