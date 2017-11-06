'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Render a group of scatters
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _ReactUtils = require('../util/ReactUtils');

var _Curve = require('../shape/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

var _Symbols = require('../shape/Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _AnimationDecorator = require('../util/AnimationDecorator');

var _AnimationDecorator2 = _interopRequireDefault(_AnimationDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PI = Math.PI;
var SYMBOL_STYLE = { transformOrigin: 'center center' };

var Scatter = (0, _AnimationDecorator2.default)(_class = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Scatter, _Component);

  function Scatter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Scatter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Scatter.__proto__ || Object.getPrototypeOf(Scatter)).call.apply(_ref, [this].concat(args))), _this), _this.state = { activeIndex: -1 }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Scatter, [{
    key: 'renderSymbolItem',
    value: function renderSymbolItem(option, props) {
      var symbol = void 0;

      if (_react2.default.isValidElement(option)) {
        symbol = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        symbol = option(props);
      } else {
        symbol = _react2.default.createElement(_Symbols2.default, _extends({}, props, { type: option }));
      }

      return symbol;
    }
  }, {
    key: 'renderSymbols',
    value: function renderSymbols() {
      var _this2 = this;

      var _props = this.props;
      var points = _props.points;
      var shape = _props.shape;
      var activeShape = _props.activeShape;
      var activeIndex = _props.activeIndex;
      var animationBegin = _props.animationBegin;
      var animationDuration = _props.animationDuration;
      var isAnimationActive = _props.isAnimationActive;
      var animationEasing = _props.animationEasing;
      var animationId = _props.animationId;

      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);

      return points.map(function (entry, i) {
        var props = _extends({
          key: 'symbol-' + i
        }, baseProps, entry);
        return _react2.default.createElement(
          _Layer2.default,
          _extends({
            className: 'recharts-scatter-symbol'
          }, (0, _ReactUtils.filterEventsOfChild)(_this2.props, entry, i), {
            key: 'symbol-' + i
          }),
          _react2.default.createElement(
            _reactSmooth2.default,
            {
              from: { size: 0 },
              to: { size: props.size },
              duration: animationDuration,
              begin: animationBegin,
              isActive: isAnimationActive,
              key: animationId,
              easing: animationEasing
            },
            function (_ref2) {
              var size = _ref2.size;

              var finalProps = _extends({}, props, { size: size });

              return _this2.renderSymbolItem(activeIndex === i ? activeShape : shape, finalProps);
            }
          )
        );
      });
    }
  }, {
    key: 'renderLine',
    value: function renderLine() {
      var _props2 = this.props;
      var points = _props2.points;
      var line = _props2.line;
      var lineType = _props2.lineType;
      var lineJointType = _props2.lineJointType;

      var scatterProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLineProps = (0, _ReactUtils.getPresentationAttributes)(line);
      var linePoints = void 0;

      if (lineType === 'joint') {
        linePoints = points.map(function (entry) {
          return { x: entry.cx, y: entry.cy };
        });
      }
      var lineProps = _extends({}, scatterProps, {
        fill: 'none',
        stroke: scatterProps.fill
      }, customLineProps, {
        points: linePoints
      });
      var lineItem = void 0;
      if (_react2.default.isValidElement(line)) {
        lineItem = _react2.default.cloneElement(line, lineProps);
      } else if ((0, _isFunction3.default)(line)) {
        lineItem = line(lineProps);
      } else {
        lineItem = _react2.default.createElement(_Curve2.default, _extends({}, lineProps, { type: lineJointType }));
      }

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-scatter-line', key: 'recharts-scatter-line' },
        lineItem
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var points = _props3.points;
      var line = _props3.line;
      var className = _props3.className;


      if (!points || !points.length) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-scatter', className);

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        line && this.renderLine(),
        _react2.default.createElement(
          _Layer2.default,
          { key: 'recharts-scatter-symbols' },
          this.renderSymbols()
        )
      );
    }
  }]);

  return Scatter;
}(_react.Component), _class2.displayName = 'Scatter', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {

  xAxisId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  yAxisId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  zAxisId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  line: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.element]),
  lineType: _react.PropTypes.oneOf(['fitting', 'joint']),
  lineJointType: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']), _react.PropTypes.func]),
  legendType: _react.PropTypes.oneOf(['line', 'square', 'rect', 'circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']),
  className: _react.PropTypes.string,

  activeIndex: _react.PropTypes.number,
  activeShape: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.element]),
  shape: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']), _react.PropTypes.element, _react.PropTypes.func]),
  points: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    cx: _react.PropTypes.number,
    cy: _react.PropTypes.number,
    size: _react.PropTypes.number,
    payload: _react.PropTypes.shape({
      x: _react.PropTypes.number,
      y: _react.PropTypes.number,
      z: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    })
  })),
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onClick: _react.PropTypes.func,

  isAnimationActive: _react.PropTypes.bool,
  animationId: _react.PropTypes.number,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  fill: '#fff',
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: 'circle',
  lineType: 'joint',
  lineJointType: 'linear',
  data: [],
  shape: 'circle',

  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'linear'
}, _temp2)) || _class) || _class;

exports.default = Scatter;