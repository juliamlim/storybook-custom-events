import React, { useState } from 'react';
import { Button, Card, Flex, H3, Input, Textarea } from './UI';

import { EMIT_EVENT } from '../constants';

function stringifyPayload(payload) {
    try {
        return JSON.stringify(payload, undefined, 2);
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

export const Event = (props) => {
    const { event } = props;

    const [eventName, setEventName] = useState(event.name);
    const [eventPayload, setEventPayload] = useState(stringifyPayload(event.payload));

    const emitEvent = () => {
        const { emit } = props;
        emit(EMIT_EVENT, { name: event.name, payload: parsePayload(event.payload) });
    }

    return (
        <Card className={props.className}>
            <label>Event Name</label>
            { props.disabled  ? <H3>{name}</H3> : <Input type="text" value={event.name}/> }
            <label>Event Detail</label>
            <Textarea value={stringifyPayload(event.payload)} rows="8" disabled={!!props.disabled}></Textarea>
            <Flex className="row">
                <Button onClick={emitEvent}>Emit</Button>
                {props.children}
            </Flex>
        </Card>
    );
};

/**
 * 

export const Event = (props) => {
    const { children, editable = false, event = {} } = props;

    const [eventName, setEventName] = useState(event.name);
    const [eventPayload, setEventPayload] = useState(stringifyPayload(event.payload));

    const emitEvent = () => {
        const { emit } = props;
        emit(EMIT_EVENT, { eventName, payload: parsePayload(eventPayload) });
    }

    return (
        <Card {...props}>
            <label>Event Name</label>
            { editable ? <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} /> : <H3>{event.name}</H3>}
            <label>Event Name</label>
            { editable 
                ? <Textarea rows="10" value={eventPayload} onChange={(e) => setEventPayload(e.target.value)}></Textarea>
                : <Textarea rows="8" value={stringifyPayload(event.payload)}></Textarea>
            }
            <Flex>
                <Button onClick={emitEvent}>Emit</Button>
                { children }
            </Flex>
        </Card>
    );
}

 * 
 */