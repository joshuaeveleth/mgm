import * as React from "react";
import { Store } from 'redux'
import { mgmState } from '../../redux/model';

import { Region } from '../../../common/messages';

interface regionProps {
    store: Store<mgmState>
}

export class Regions extends React.Component<regionProps, {}> {
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
            return <li key={r.uuid}>{r.uuid}</li>
        })

        return (
            <div>
                <h1>Regions View</h1>
                <ul>
                    {regions}
                </ul>
            </div>
        )
    }
}