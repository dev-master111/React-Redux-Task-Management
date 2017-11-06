'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Cartesian Axis
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _DOMUtils = require('../util/DOMUtils');

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Text = require('../component/Text');

var _Text2 = _interopRequireDefault(_Text);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartesianAxis = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(CartesianAxis, _Component);

  function CartesianAxis() {
    _classCallCheck(this, CartesianAxis);

    return _possibleConstructorReturn(this, (CartesianAxis.__proto__ || Object.getPrototypeOf(CartesianAxis)).apply(this, arguments));
  }

  _createClass(CartesianAxis, [{
    key: 'getTickLineCoord',

    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
    value: function getTickLineCoord(data) {
      var _props = this.props;
      var x = _props.x;
      var y = _props.y;
      var width = _props.width;
      var height = _props.height;
      var orientation = _props.orientation;
      var tickSize = _props.tickSize;

      var x1 = void 0;
      var x2 = void 0;
      var y1 = void 0;
      var y2 = void 0;

      var finalTickSize = data.tickSize || tickSize;

      switch (orientation) {
        case 'top':
          x1 = x2 = data.coordinate;
          y1 = y + height - finalTickSize;
          y2 = y + height;
          break;
        case 'left':
          y1 = y2 = data.coordinate;
          x1 = x + width - finalTickSize;
          x2 = x + width;
          break;
        case 'right':
          y1 = y2 = data.coordinate;
          x1 = x + finalTickSize;
          x2 = x;
          break;
        default:
          x1 = x2 = data.coordinate;
          y1 = y + finalTickSize;
          y2 = y;
          break;
      }

      return { x1: x1, y1: y1, x2: x2, y2: y2 };
    }
  }, {
    key: 'getBaseline',
    value: function getBaseline() {
      var orientation = this.props.orientation;

      var baseline = void 0;

      switch (orientation) {
        case 'top':
          baseline = 'auto';
          break;
        case 'bottom':
          baseline = 'text-before-edge';
          break;
        default:
          baseline = 'central';
          break;
      }

      return baseline;
    }
  }, {
    key: 'getTickTextAnchor',
    value: function getTickTextAnchor() {
      var orientation = this.props.orientation;

      var textAnchor = void 0;

      switch (orientation) {
        case 'left':
          textAnchor = 'end';
          break;
        case 'right':
          textAnchor = 'start';
          break;
        default:
          textAnchor = 'middle';
          break;
      }

      return textAnchor;
    }
  }, {
    key: 'getTickVerticalAnchor',
    value: function getTickVerticalAnchor() {
      var orientation = this.props.orientation;

      var verticalAnchor = 'end';

      switch (orientation) {
        case 'left':
        case 'right':
          verticalAnchor = 'middle';
          break;
        case 'top':
          verticalAnchor = 'end';
          break;
        default:
          verticalAnchor = 'start';
          break;
      }

      return verticalAnchor;
    }
  }, {
    key: 'getLabelProps',
    value: function getLabelProps() {
      var _props2 = this.props;
      var x = _props2.x;
      var y = _props2.y;
      var width = _props2.width;
      var height = _props2.height;
      var orientation = _props2.orientation;


      switch (orientation) {
        case 'left':
          return { x: x + width, y: y - 6, textAnchor: 'middle' };
        case 'right':
          return { x: x, y: y - 6, textAnchor: 'middle' };
        case 'top':
          return { x: x + width + 6, y: y + height + 6, textAnchor: 'start' };
        default:
          return { x: x + width + 6, y: y + 6, textAnchor: 'start' };
      }
    }
  }, {
    key: 'renderAxisLine',
    value: function renderAxisLine() {
      var _props3 = this.props;
      var x = _props3.x;
      var y = _props3.y;
      var width = _props3.width;
      var height = _props3.height;
      var orientation = _props3.orientation;
      var axisLine = _props3.axisLine;

      var props = _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), {
        fill: 'none'
      }, (0, _ReactUtils.getPresentationAttributes)(axisLine));

      switch (orientation) {
        case 'top':
          props = _extends({}, props, { x1: x, y1: y + height, x2: x + width, y2: y + height });
          break;
        case 'left':
          props = _extends({}, props, { x1: x + width, y1: y, x2: x + width, y2: y + height });
          break;
        case 'right':
          props = _extends({}, props, { x1: x, y1: y, x2: x, y2: y + height });
          break;
        default:
          props = _extends({}, props, { x1: x, y1: y, x2: x + width, y2: y });
          break;
      }

      return _react2.default.createElement('line', _extends({ className: 'recharts-cartesian-axis-line' }, props));
    }
  }, {
    key: 'renderTickItem',
    value: function renderTickItem(option, props, value) {
      var tickItem = void 0;

      if (_react2.default.isValidElement(option)) {
        tickItem = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        tickItem = option(props);
      } else {
        tickItem = _react2.default.createElement(
          _Text2.default,
          _extends({}, props, {
            className: 'recharts-cartesian-axis-tick-value'
          }),
          value
        );
      }

      return tickItem;
    }
  }, {
    key: 'renderTicks',
    value: function renderTicks() {
      var _this2 = this;

      var _props4 = this.props;
      var ticks = _props4.ticks;
      var tickLine = _props4.tickLine;
      var stroke = _props4.stroke;
      var tick = _props4.tick;
      var tickFormatter = _props4.tickFormatter;

      var finalTicks = CartesianAxis.getTicks(this.props);
      var textAnchor = this.getTickTextAnchor();
      var verticalAnchor = this.getTickVerticalAnchor();
      var axisProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customTickProps = (0, _ReactUtils.getPresentationAttributes)(tick);
      var tickLineProps = _extends({}, axisProps, { fill: 'none' }, (0, _ReactUtils.getPresentationAttributes)(tickLine));
      var items = finalTicks.map(function (entry, i) {
        var lineCoord = _this2.getTickLineCoord(entry);
        var tickProps = _extends({
          textAnchor: textAnchor,
          verticalAnchor: verticalAnchor
        }, axisProps, {
          stroke: 'none', fill: stroke
        }, customTickProps, {
          index: i, x: lineCoord.x1, y: lineCoord.y1, payload: entry
        });

        return _react2.default.createElement(
          'g',
          { className: 'recharts-cartesian-axis-tick', key: 'tick-' + i },
          tickLine && _react2.default.createElement('line', _extends({
            className: 'recharts-cartesian-axis-tick-line'
          }, tickLineProps, lineCoord)),
          tick && _this2.renderTickItem(tick, tickProps, (0, _isFunction3.default)(tickFormatter) ? tickFormatter(entry.value) : entry.value)
        );
      });

      return _react2.default.createElement(
        'g',
        { className: 'recharts-cartesian-axis-ticks' },
        items
      );
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      var _props5 = this.props;
      var label = _props5.label;
      var stroke = _props5.stroke;
      var orientation = _props5.orientation;
      var viewBox = _props5.viewBox;

      var presentation = (0, _ReactUtils.getPresentationAttributes)(this.props);

      if (_react2.default.isValidElement(label)) {
        return _react2.default.cloneElement(label, _extends({}, presentation, { orientation: orientation, viewBox: viewBox }));
      } else if ((0, _isFunction3.default)(label)) {
        return label(this.props);
      } else if ((0, _isString3.default)(label) || (0, _isNumber3.default)(label)) {
        var props = _extends({}, presentation, {
          stroke: 'none',
          fill: stroke
        }, this.getLabelProps());

        return _react2.default.createElement(
          'g',
          { className: 'recharts-cartesian-axis-label' },
          _react2.default.createElement(
            _Text2.default,
            props,
            label
          )
        );
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props;
      var axisLine = _props6.axisLine;
      var width = _props6.width;
      var height = _props6.height;
      var ticks = _props6.ticks;
      var label = _props6.label;


      if (width <= 0 || height <= 0 || !ticks || !ticks.length) {
        return null;
      }

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-cartesian-axis' },
        axisLine && this.renderAxisLine(),
        this.renderTicks(),
        this.renderLabel()
      );
    }
  }], [{
    key: 'getTicks',
    value: function getTicks(props) {
      var ticks = props.ticks;
      var viewBox = props.viewBox;
      var minTickGap = props.minTickGap;
      var orientation = props.orientation;
      var interval = props.interval;
      var tickFormatter = props.tickFormatter;


      if (!ticks || !ticks.length) {
        return [];
      }

      return (0, _isNumber3.default)(interval) || (0, _ReactUtils.isSsr)() ? CartesianAxis.getNumberIntervalTicks(ticks, (0, _isNumber3.default)(interval) ? interval : 0) : CartesianAxis.getAutoIntervalTicks(ticks, tickFormatter, viewBox, orientation, minTickGap);
    }
  }, {
    key: 'getNumberIntervalTicks',
    value: function getNumberIntervalTicks(ticks, interval) {
      return ticks.filter(function (entry, i) {
        return i % (interval + 1) === 0;
      });
    }
  }, {
    key: 'getAutoIntervalTicks',
    value: function getAutoIntervalTicks(ticks, tickFormatter, viewBox, orientation, minTickGap) {
      var x = viewBox.x;
      var y = viewBox.y;
      var width = viewBox.width;
      var height = viewBox.height;

      var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
      var sign = ticks.length >= 2 ? Math.sign(ticks[1].coordinate - ticks[0].coordinate) : 1;

      var pointer = void 0;

      if (sign === 1) {
        pointer = sizeKey === 'width' ? x : y;
      } else {
        pointer = sizeKey === 'width' ? x + width : y + height;
      }

      return ticks.filter(function (entry) {
        var tickContent = (0, _isFunction3.default)(tickFormatter) ? tickFormatter(entry.value) : entry.value;
        var tickSize = (0, _DOMUtils.getStringSize)(tickContent)[sizeKey];
        var isShow = sign === 1 ? entry.coordinate - tickSize / 2 >= pointer : entry.coordinate + tickSize / 2 <= pointer;

        if (isShow) {
          pointer = entry.coordinate + sign * tickSize / 2 + minTickGap;
        }

        return isShow;
      });
    }
  }]);

  return CartesianAxis;
}(_react.Component), _class2.displayName = 'CartesianAxis', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  x: _react.PropTypes.number,
  y: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  orientation: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  viewBox: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number
  }),
  label: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.element]),
  tick: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func, _react.PropTypes.object, _react.PropTypes.element]),
  axisLine: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
  tickLine: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),

  minLabelGap: _react.PropTypes.number,
  ticks: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.any,
    coordinate: _react.PropTypes.value
  })),
  tickSize: _react.PropTypes.number,
  stroke: _react.PropTypes.string,
  tickFormatter: _react.PropTypes.func,
  interval: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
}), _class2.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
  // The orientation of axis
  orientation: 'bottom',
  // The ticks
  ticks: [],

  stroke: '#666',
  tickLine: true,
  axisLine: true,
  tick: true,

  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  interval: 'auto'
}, _temp)) || _class;

exports.default = CartesianAxis;