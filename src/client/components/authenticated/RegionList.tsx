import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

import { Region } from '../../../common/messages';
import { RegionView } from './RegionView';

import { Grid, Row, Col } from 'react-bootstrap';

interface regionProps {
    store: Store<mgmState>
}

export class RegionList extends React.Component<regionProps, {}> {
    state: {
        regions: Region[]
    }
    unsub: Redux.Unsubscribe;

    constructor(props: regionProps) {
        super(props);
        this.state = {
            regions: this.pullRegionsFromStore()
        }
        this.unsub = this.props.store.subscribe(() => {
            this.setState({
                regions: this.pullRegionsFromStore()
            });
        });
    }

    pullRegionsFromStore(): Region[] {
        let regions: Region[] = [];
        let state = this.props.store.getState().regions;
        for (let uuid in state) {
            regions.push(state[uuid]);
        }
        return regions;
    }

    componentWillUnmount() {
        this.unsub();
    }

    render() {
        let regions = this.state.regions.map((r: Region) => {
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