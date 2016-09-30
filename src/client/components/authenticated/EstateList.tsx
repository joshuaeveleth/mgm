import * as React from "react";
import { Action } from "redux";

import { EstateRecord } from '../../redux/model'
import { User } from '../../../common/messages'

import { EstateView } from './EstateView';

import { Grid, Row, Col } from 'react-bootstrap'

interface estateListProps {
    dispatch: (a: Action) => void,
    estates: {[key:number]:EstateRecord}
    users: {[key:string]: User}
}

export class EstateList extends React.Component<estateListProps, {}> {

    pullEstatesFromStore(): EstateRecord[] {
        let estates: EstateRecord[] = [];
        let state = this.props.estates;
        for (let uuid in state) {
            if(state[uuid].estate)
                estates.push(state[uuid]);
        }
        return estates;
    }

    render() {
        let estates = this.pullEstatesFromStore().map( (e: EstateRecord) => {
            return <EstateView key={e.estate.EstateID} users={this.props.users} estate={e}/>
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