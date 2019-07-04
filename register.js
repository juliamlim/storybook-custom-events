import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';

export default makeDecorator({
  name: 'withFoo',
  parameterName: 'foo',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    // Our simple API above simply sets the notes parameter to a string,
    // which we send to the channel
    channel.emit('foo/doSomeAction', parameters);
    // we can also add subscriptions here using channel.on('eventName', callback);

    return getStory(context);
  }
});

class MyPanel extends React.Component {
    // onSomeAction = text => {
    //   // do something with the passed data
    // };
    // onStoryChange = id => {
    //   // do something with the new selected storyId
    // };
  
    componentDidMount() {
      const { api } = this.props;
      api.on('foo/doSomeAction', this.onSomeAction);
      api.on(STORY_CHANGED, this.onStoryChange);
    }
    componentWillUnmount() {
      const { api } = this.props;
      api.off('foo/doSomeAction', this.onSomeAction);
      api.off(STORY_CHANGED, this.onStoryChange);
    }
  
    render() {
      const { active } = this.props;
  
      return active ? <div /> : null;
    }
  }
  
  // Register the addon with a unique name.
  addons.register('MYADDON', api => {
    // Also need to set a unique name to the panel.
    addons.addPanel('MYADDON/panel', {
      title: 'My Addon',
      render: ({ active, key }) => <MyPanel key={key} api={api} active={active} />,
    });
  });