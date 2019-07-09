import React, { useState } from 'react';
import { Button, Card, Flex, Input, Textarea } from './UI';

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
    const { name, payload } = props || {};

    const [eventName, setEventName] = useState(name || '');
    const [eventPayload, setEventPayload] = useState(stringifyPayload(payload) || '');

    const emitEvent = () => {
        const { emit } = props;
        emit(EMIT_EVENT, { name: eventName, payload: parsePayload(eventPayload) });
    }

    return (
        <Card>
            <label>Event</label>
            <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}/>
            <label>Payload</label>
            <Textarea value={eventPayload} rows="8" onChange={(e) => setEventPayload(e.target.value)}></Textarea>
            <Flex className="row">
                <Button onClick={emitEvent}>Emit</Button>
                <Button className="error" >Delete</Button>
            </Flex>
        </Card>
    );
};