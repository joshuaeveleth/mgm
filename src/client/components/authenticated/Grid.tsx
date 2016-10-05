import * as React from "react";
import { Action } from 'redux';
import { Map } from 'immutable';

import { Tabs, Tab } from 'react-bootstrap';

import { EstateList } from './EstateList';
import { GroupList } from './GroupList';
import { HostList } from './HostList';

import { EstateRecord, GroupRecord } from '../../redux/model'
import { Host, User, Region } from '../../../common/messages'

interface gridProps {
    dispatch: (a: Action) => void,
    estates: Map<number, EstateRecord>
    hosts: Map<number, Host>
    groups: Map<string, GroupRecord>
    users: Map<string, User>
    regions: Map<string, Region>
}

export class Grid extends React.Component<gridProps, {}> {
    state: {
        tab: number
    }

    constructor(props: gridProps) {
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
            <Tabs activeKey={this.state.tab} onSelect={ this.handleSelect.bind(this) } id="controlled-tab-example">
                <Tab eventKey={1} title="Estates">
                    <EstateList
                        dispatch={this.props.dispatch}
                        estates={this.props.estates}
                        users={this.props.users} /></Tab>
                <Tab eventKey={2} title="Groups">
                    <GroupList
                        dispatch={this.props.dispatch}
                        groups={this.props.groups} /></Tab>
                <Tab eventKey={3} title="Hosts">
                    <HostList
                        dispatch={this.props.dispatch}
                        hosts={this.props.hosts}
                        regions={this.props.regions} /></Tab>
            </Tabs>
        );
    }
}