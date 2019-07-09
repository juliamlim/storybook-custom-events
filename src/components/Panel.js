import React from 'react';
import { STORY_RENDERED } from '@storybook/core-events';
import { css, jsx } from '@emotion/core';

import { Button, Card, Flex } from './UI';

import { ADDON_ID } from '../constants';
import { Event } from './Event';

export class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { events: [] };
        this.api = props.api || {};

        this.addBlankEvent = this.addBlankEvent.bind(this);
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
        this.setState({ events: this.api.getParameters(id, ADDON_ID) || [] });
    }

    addBlankEvent() {
        this.setState({ events: [ ...this.state.events, { name: '', payload: '' }] });
    }

    render() {
        const { active } = this.props;
        const { events } = this.state;

        return active ? <Flex>
            <Card className="secondary">
                <h1>Samples</h1>
                { events.map((event, index) => <Button className="secondary">{event.name}</Button>) }
            </Card>
            <Card>
                <h1>Edit</h1>
            </Card>
                {/* { events.map((event, index) => <Event key={index} name={ event.name } payload={ event.payload } emit={this.api.emit} />) } */}
        </Flex> : null;
    }
}