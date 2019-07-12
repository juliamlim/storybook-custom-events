import React, { useState } from 'react';
import { STORY_RENDERED } from '@storybook/core-events';

import { Button, Card, Flex, Textarea, H3, Input } from './UI';

import { ADDON_ID, EMIT_EVENT } from '../constants';
import { Event } from './Event';

export class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            current: {},
            edit: {
                name: '',
                payload: ''
            },
            events: [] 
        };
        this.api = props.api || {};

        this.storyChanged = this.storyChanged.bind(this);
    }

    componentDidMount() {
        this.api.on(STORY_RENDERED, this.storyChanged);
    }

    componentWillUnmount() {
        this.api.off(STORY_RENDERED, this.storyChanged);
    }

    storyChanged(id) {
        this.setState({ events: [] });
        const events = this.api.getParameters(id, ADDON_ID) || [];
        this.setState({ events, current: events[0] || {} });
    }

    setCurrent(current) {
        this.setState({ current });
    }

    editEvent(current) {
        this.setState({ edit: { name: current.name, payload: stringifyPayload(current.payload, null, 0) } });
    }

    render() {
        const { active } = this.props;
        const { current, edit, events } = this.state;

        return active ? <Flex>
            <Card className="secondary">
                { events.map((event, index) => <Button key={index} className={current.name === event.name ? 'secondary active' : 'secondary'} onClick={() => this.setCurrent(event)}>{event.name}</Button>) }
                {
                    events.length ? (
                        <Card className="secondary">
                            <label>Event Name</label>
                            <H3>{current.name}</H3>
                            <label>Event Detail</label>
                            <Textarea value={stringifyPayload(current.payload)} rows="8" disabled></Textarea>
                            <Flex className="row">
                                <Button onClick={() => this.api.emit(EMIT_EVENT, {name: current.name, payload: current.payload})}>Emit</Button>
                                <Button className="outline" onClick={() => this.editEvent(current)}>Edit</Button>
                            </Flex>
                        </Card>
                    ) : <p><b>No Custom Events Found</b></p> 
                }
            </Card>
            <Card>
                <label>Event Name</label>
                <Input type="text" value={edit.name} onChange={(e) => this.setState({ edit: { name: e.target.value, payload: this.state.edit.payload } })}/>
                <label>Event Detail</label>
                <Textarea value={edit.payload} rows="8" onChange={(e) => this.setState({ edit: { name: this.state.edit.name, payload: e.target.value} })}></Textarea>
                <Flex className="row">
                    <Button onClick={() => this.api.emit(EMIT_EVENT, {name: edit.name, payload: parsePayload(edit.payload)})}>Emit</Button>
                </Flex>
            </Card>
        </Flex> : null;
    }
}

function stringifyPayload(payload, replacer = undefined, space = 2) {
    try {
        return JSON.stringify(payload, replacer, space);
    } catch (error) {
        return payload;
    }
}

function parsePayload(payload) {
    try {
        return JSON.parse(payload);
    } catch (error) {
        return payload;
    }
}