import * as React from "react";
import { Action } from "redux";
import { Map, Set } from 'immutable';
const shallowequal = require('shallowequal');

import { Estate } from '.'
import { User } from '../Users';

import { EstateView } from './EstateView';

import { Grid, Row, Col, Button } from 'react-bootstrap'
import { EstateAddModal } from './EstateAdd';

interface props {
    dispatch: (a: Action) => void,
    estates: Map<number, Estate>
    estateMap: Map<string, number>,
    managers: Map<number, Set<string>>,
    users: Map<string, User>
}

interface state {
    showAdd: boolean
}

export class EstateList extends React.Component<props, {}> {
    state: state
    constructor(props: props) {
        super(props);
        this.state = {
            showAdd: false
        }
    }

    shouldComponentUpdate(nextProps: props, nextState: state) {
        return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState) ;
    }

    showAddEstate() {
        this.setState({
            showAdd: true
        })
    }

    onNewEstate(name: string, owner: string) {
        //RequestCreateEstate(name, owner);
        alertify.error('not implemented');
        this.setState({
            showAdd: false
        })
    }
    cancelNewEstate() {
        this.setState({
            showAdd: false
        })
    }

    render() {
        let regionCount: { [key: number]: number } = {};
        this.props.estateMap.map((estateID: number, regionId: string) => {
            if (regionCount[estateID]) {
                regionCount[estateID] += 1;
            } else {
                regionCount[estateID] = 1;
            }
        })
        let estates = this.props.estates.toList().map((e: Estate) => {
            return <EstateView
                key={e.id}
                dispatch={this.props.dispatch}
                users={this.props.users}
                managers={this.props.managers.get(e.id)}
                estate={e}
                regionCount={regionCount[e.id] || 0} />
        })
        let addEstate = <span />
        if (this.state.showAdd) {
            addEstate = <EstateAddModal
                cancel={this.cancelNewEstate.bind(this)}
                submit={this.onNewEstate.bind(this)}
                users={this.props.users}
                estates={this.props.estates} />;
        }
        return (
            <Grid>
                <h1>Estates</h1>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={1}>Regions</Col>
                    <Col md={3}>Owner</Col>
                    <Col md={4}>Managers</Col>
                    <Col md={1}><Button onClick={this.showAddEstate.bind(this)}>Add Estate</Button></Col>
                </Row>
                {estates}
                {addEstate}
            </Grid>
        );
    }
}