"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;

var _react = _interopRequireWildcard(require("react"));

var _UI = require("./UI");

var _constants = require("../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var Event = function Event(props) {
  var event = props.event;

  var _useState = (0, _react.useState)(event.name),
      _useState2 = _slicedToArray(_useState, 2),
      eventName = _useState2[0],
      setEventName = _useState2[1];

  var _useState3 = (0, _react.useState)(stringifyPayload(event.payload)),
      _useState4 = _slicedToArray(_useState3, 2),
      eventPayload = _useState4[0],
      setEventPayload = _useState4[1];

  var emitEvent = function emitEvent() {
    var emit = props.emit;
    emit(_constants.EMIT_EVENT, {
      name: event.name,
      payload: parsePayload(event.payload)
    });
  };

  return _react["default"].createElement(_UI.Card, {
    className: props.className
  }, _react["default"].createElement("label", null, "Event Name"), props.disabled ? _react["default"].createElement(_UI.H3, null, name) : _react["default"].createElement(_UI.Input, {
    type: "text",
    value: event.name
  }), _react["default"].createElement("label", null, "Event Detail"), _react["default"].createElement(_UI.Textarea, {
    value: stringifyPayload(event.payload),
    rows: "8",
    disabled: !!props.disabled
  }), _react["default"].createElement(_UI.Flex, {
    className: "row"
  }, _react["default"].createElement(_UI.Button, {
    onClick: emitEvent
  }, "Emit"), props.children));
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


exports.Event = Event;