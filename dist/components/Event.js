"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@emotion/core");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            padding: 32px;\n            background-color: hotpink;\n            font-size: 24px;\n            border-radius: 4px;\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var editable = function editable(value) {
  switch (_typeof(value)) {
    case 'object':
      return JSON.stringify(value, undefined, 2);

    default:
      return value;
  }
};

var Event = function Event(props) {
  var _ref = props.event || {},
      name = _ref.name,
      payload = _ref.payload;

  var _useState = (0, _react.useState)(name || ''),
      _useState2 = _slicedToArray(_useState, 2),
      eventName = _useState2[0],
      setEventName = _useState2[1];

  var _useState3 = (0, _react.useState)(editable(payload) || null),
      _useState4 = _slicedToArray(_useState3, 2),
      eventPayload = _useState4[0],
      setEventPayload = _useState4[1];

  var emitEvent = function emitEvent() {
    var emit = props.emit;
    emit('customEvents/emitEvent', eventPayload);
  };

  return _react["default"].createElement("div", {
    css: (0, _core.css)(_templateObject())
  }, _react["default"].createElement("label", null, "Event"), "\xA0", _react["default"].createElement("input", {
    type: "text",
    value: eventName,
    onChange: function onChange(e) {
      return setEventName(e.target.value);
    }
  }), _react["default"].createElement("label", null, "Payload"), "\xA0", _react["default"].createElement("textarea", {
    value: eventPayload,
    onChange: function onChange(e) {
      return setEventPayload(editable(e.target.value));
    }
  }), _react["default"].createElement("button", {
    onClick: emitEvent
  }, "Emit"), _react["default"].createElement("button", null, "Delete"));
};

exports.Event = Event;