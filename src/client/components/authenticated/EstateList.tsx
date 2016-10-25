import * as React from "react";
import { Action } from "redux";
import { Map, Set } from 'immutable';

import { Estate, User } from '../../redux/model'

import { EstateView } from './EstateView';

import { Grid, Row, Col } from 'react-bootstrap'

interface estateListProps {
    dispatch: (a: Action) => void,
    estates: Map<number,Estate>
    estateMap: Map<string, number>,
    managers: Map<number, Set<string>>,
    users: Map<string,User>
}

export class EstateList extends React.Component<estateListProps, {}> {

    render() {
        let regionCount: {[key: number]: number} = {};
        this.props.estateMap.map( (estateID: number, regionId: string) => {
            if(regionCount[estateID]){
                regionCount[estateID] += 1;
            } else {
                regionCount[estateID] = 1;
            }
        })
        let estates = this.props.estates.toList().map( (e: Estate) => {
            return <EstateView key={e.EstateID} users={this.props.users} managers={this.props.managers.get(e.EstateID)} estate={e} regionCount={regionCount[e.EstateID]} />
        })
        return (
            <Grid>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={1}>Regions</Col>
                    <Col md={3}>Owner</Col>
                    <Col md={5}>Managers</Col>
                </Row>
                {estates}
            </Grid>
        );
    }
}