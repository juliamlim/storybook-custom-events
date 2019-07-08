import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'

const editable = (value) => {
    switch (typeof value) {
        case 'object':
            return JSON.stringify(value, undefined, 2);
        default:
            return value;
    }
}

export const Event = (props) => {
    const { name, payload } = props.event || {};

    const [eventName, setEventName] = useState(name || '');
    const [eventPayload, setEventPayload] = useState(editable(payload) || null);

    const emitEvent = () => {
        const { emit } = props;
        emit('customEvents/emitEvent', eventPayload);
    }

    return (
        <div css={css`
            padding: 32px;
            background-color: hotpink;
            font-size: 24px;
            border-radius: 4px;
        `}>
            <label>Event</label>&nbsp;<input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}/>
            <label>Payload</label>&nbsp;<textarea value={eventPayload} onChange={(e) => setEventPayload(editable(e.target.value))}></textarea>
            <button onClick={emitEvent}>Emit</button>
            <button>Delete</button>
        </div>
    );
};