import * as React from "react";

import { Tabs, Tab } from 'react-bootstrap';

import { EstateList } from './EstateList';
import { GroupList } from './GroupList';
import { HostList } from './HostList';

export class Grid extends React.Component<{}, {}> {
    state: {
        tab: number
    }

    constructor(props: {}) {
        super(props);
        this.state = {
            tab: 1
        }
    }

    handleSelect(key: number) {
        this.setState({ tab: key });
    }

    render() {
        return (
            <Tabs activeKey={this.state.tab} onSelect={this.handleSelect.bind(this) } id="controlled-tab-example">
                <Tab eventKey={1} title="Estates"><EstateList /></Tab>
                <Tab eventKey={2} title="Groups"><GroupList /></Tab>
                <Tab eventKey={3} title="Hosts"><HostList /></Tab>
            </Tabs>
        );
    }
}