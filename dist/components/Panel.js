"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _coreEvents = require("@storybook/core-events");

var _UI = require("./UI");

var _constants = require("../constants");

var _Event = require("./Event");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Panel).call(this, props));
    _this.state = {
      current: {},
      edit: {
        name: '',
        payload: ''
      },
      events: []
    };
    _this.api = props.api || {};
    _this.storyChanged = _this.storyChanged.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Panel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.api.on(_coreEvents.STORY_RENDERED, this.storyChanged);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.api.off(_coreEvents.STORY_RENDERED, this.storyChanged);
    }
  }, {
    key: "storyChanged",
    value: function storyChanged(id) {
      this.setState({
        events: []
      });
      var events = this.api.getParameters(id, _constants.ADDON_ID) || [];
      this.setState({
        events: events,
        current: events[0] || {}
      });
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(current) {
      this.setState({
        current: current
      });
    }
  }, {
    key: "editEvent",
    value: function editEvent(current) {
      this.setState({
        edit: {
          name: current.name,
          payload: stringifyPayload(current.payload, null, 0)
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var active = this.props.active;
      var _this$state = this.state,
          current = _this$state.current,
          edit = _this$state.edit,
          events = _this$state.events;
      return active ? _react["default"].createElement(_UI.Flex, null, _react["default"].createElement(_UI.Card, {
        className: "secondary"
      }, events.map(function (event, index) {
        return _react["default"].createElement(_UI.Button, {
          key: index,
          className: current.name === event.name ? 'secondary active' : 'secondary',
          onClick: function onClick() {
            return _this2.setCurrent(event);
          }
        }, event.name);
      }), events.length ? _react["default"].createElement(_UI.Card, {
        className: "secondary"
      }, _react["default"].createElement("label", null, "Event Name"), _react["default"].createElement(_UI.H3, null, current.name), _react["default"].createElement("label", null, "Event Detail"), _react["default"].createElement(_UI.Textarea, {
        value: stringifyPayload(current.payload),
        rows: "8",
        disabled: true
      }), _react["default"].createElement(_UI.Flex, {
        className: "row"
      }, _react["default"].createElement(_UI.Button, {
        onClick: function onClick() {
          return _this2.api.emit(_constants.EMIT_EVENT, {
            name: current.name,
            payload: current.payload
          });
        }
      }, "Emit"), _react["default"].createElement(_UI.Button, {
        className: "outline",
        onClick: function onClick() {
          return _this2.editEvent(current);
        }
      }, "Edit"))) : _react["default"].createElement("p", null, _react["default"].createElement("b", null, "No Custom Events Found"))), _react["default"].createElement(_UI.Card, null, _react["default"].createElement("label", null, "Event Name"), _react["default"].createElement(_UI.Input, {
        type: "text",
        value: edit.name,
        onChange: function onChange(e) {
          return _this2.setState({
            edit: {
              name: e.target.value,
              payload: _this2.state.edit.payload
            }
          });
        }
      }), _react["default"].createElement("label", null, "Event Detail"), _react["default"].createElement(_UI.Textarea, {
        value: edit.payload,
        rows: "8",
        onChange: function onChange(e) {
          return _this2.setState({
            edit: {
              name: _this2.state.edit.name,
              payload: e.target.value
            }
          });
        }
      }), _react["default"].createElement(_UI.Flex, {
        className: "row"
      }, _react["default"].createElement(_UI.Button, {
        onClick: function onClick() {
          return _this2.api.emit(_constants.EMIT_EVENT, {
            name: edit.name,
            payload: parsePayload(edit.payload)
          });
        }
      }, "Emit")))) : null;
    }
  }]);

  return Panel;
}(_react["default"].Component);

exports.Panel = Panel;

function stringifyPayload(payload) {
  var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

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