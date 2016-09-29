import * as React from "react";

import { Tabs, Tab } from 'react-bootstrap';

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
        console.log('blargh: ' + key);
        this.setState({ tab: key });
    }

    render() {
        return (
            <Tabs activeKey={this.state.tab} onSelect={this.handleSelect.bind(this) } id="controlled-tab-example">
                <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
                <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
            </Tabs>
        );
    }
}