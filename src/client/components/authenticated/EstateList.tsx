import * as React from "react";
import { Action } from "redux";
import { Map } from 'immutable';

import { EstateRecord } from '../../redux/model'
import { User } from '../../../common/messages'

import { EstateView } from './EstateView';

import { Grid, Row, Col } from 'react-bootstrap'

interface estateListProps {
    dispatch: (a: Action) => void,
    estates: Map<number,EstateRecord>
    users: Map<string,User>
}

export class EstateList extends React.Component<estateListProps, {}> {

    render() {
        let estates = this.props.estates.toList().map( (e: EstateRecord) => {
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