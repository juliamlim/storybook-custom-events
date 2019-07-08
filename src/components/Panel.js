import React, { useState } from 'react';

import { PARAM_KEY } from '../shared';

import { Event } from './Event';

export class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { events: [] };

        this.addBlankEvent = this.addBlankEvent.bind(this);
    }

    componentDidUpdate() {
        this.state = { events: this.getParams() };
    }

    addBlankEvent() {
        this.setState({ events: [ ...this.state.events, { name: '', payload: '' } ] })
    }

    getParams() {
        const { api } = this.props;
        const current = api.getCurrentStoryData();
        return ( current ? api.getParameters( current.id, PARAM_KEY ) : [] ) || [];        
    }

    render() {
        const { api, active } = this.props;
        const { events } = this.state;

        return active ? <div>
            { events.map((event, index) => <Event key={index} event={event} emit={api.emit} />) }
            <button onClick={this.addBlankEvent}>Add Custom Event</button>
        </div> : null;
    }
}

// const addEvent = () => {

// }

// export const Panel = (props) => {
//     const { api } = props;

//     const current = api.getCurrentStoryData();

//     const params = ( current ? api.getParameters( current.id, PARAM_KEY ) : [] ) || [];

//     const addEvent = () => {
//         params.push({ name: '', payload: '' });
//     }

//     return <div>
//         { params.map((event, index) => <Event key={index} api={api} event={event} />) }
//         <button onClick={addEvent}>Add Custom Event</button>
//     </div>;
// }