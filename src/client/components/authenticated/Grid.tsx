import * as React from "react";
import { Action } from 'redux';
import { Map, Set } from 'immutable';

import { Tabs, Tab } from 'react-bootstrap';

import { EstateList } from './EstateList';
import { GroupList } from './GroupList';
import { HostList } from './HostList';

import { Estate, Group, Host, User, Region, Role } from '../../redux/model'

interface gridProps {
    dispatch: (a: Action) => void,
    estates: Map<number, Estate>
    estateMap: Map<string, number>
    managers: Map<number, Set<string>>
    hosts: Map<number, Host>
    groups: Map<string, Group>
    members: Map<string, Set<string>>
    roles: Map<string, Map<string, Role>>
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
                        users={this.props.users}
                        estateMap={this.props.estateMap}
                        managers={this.props.managers} /></Tab>
                <Tab eventKey={2} title="Groups">
                    <GroupList
                        dispatch={this.props.dispatch}
                        groups={this.props.groups} 
                        members={this.props.members}
                        roles={this.props.roles} /></Tab>
                <Tab eventKey={3} title="Hosts">
                    <HostList
                        dispatch={this.props.dispatch}
                        hosts={this.props.hosts}
                        regions={this.props.regions} /></Tab>
            </Tabs>
        );
    }
}