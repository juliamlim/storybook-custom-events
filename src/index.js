// import addons from '@storybook/addons';
// import { STORY_CHANGED, REGISTER_SUBSCRIPTION } from '@storybook/core-events';

// import { EMIT_EVENT } from './constants';

// function emitEvent({name, payload}) {
//     const event = new CustomEvent(name, {
//         bubbles: true,
//         detail: payload
//     });

//     console.log('CUSTOM EVENT', event);

//     window.dispatchEvent(event);
// }

// function disconnectCallbacks() {
//     const channel = addons.getChannel();
//     channel.removeListener(EMIT_EVENT, emitEvent);
//     channel.removeListener(STORY_CHANGED, getParams);
// }

// function connectedCallbacks() {
//     const channel = addons.getChannel();
//     channel.on(EMIT_EVENT, emitEvent);
//     channel.on(STORY_CHANGED, getParams);

//     return disconnectCallbacks;
// }

// export function registerCustomEvents() {
//     addons.getChannel().emit(REGISTER_SUBSCRIPTION, connectedCallbacks);
// }