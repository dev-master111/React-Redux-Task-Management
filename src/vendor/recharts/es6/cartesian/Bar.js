'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Render a group of bar
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _Rectangle = require('../shape/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Text = require('../component/Text');

var _Text2 = _interopRequireDefault(_Text);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Bar, _Component);

  function Bar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bar.__proto__ || Object.getPrototypeOf(Bar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isAnimationFinished: false
    }, _this.handleAnimationEnd = function () {
      _this.setState({ isAnimationFinished: true });
    }, _this.handleAnimationStart = function () {
      _this.setState({ isAnimationFinished: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bar, [{
    key: 'renderRectangle',
    value: function renderRectangle(option, props) {
      var rectangle = void 0;

      if (_react2.default.isValidElement(option)) {
        rectangle = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        rectangle = option(props);
      } else {
        rectangle = _react2.default.createElement(_Rectangle2.default, _extends({}, props, { className: 'recharts-bar-rectangle' }));
      }

      return rectangle;
    }
  }, {
    key: 'renderRectangles',
    value: function renderRectangles() {
      var _this2 = this;

      var _props = this.props;
      var data = _props.data;
      var shape = _props.shape;
      var layout = _props.layout;
      var isAnimationActive = _props.isAnimationActive;
      var animationBegin = _props.animationBegin;
      var animationDuration = _props.animationDuration;
      var animationEasing = _props.animationEasing;
      var animationId = _props.animationId;

      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var getStyle = function getStyle(isBegin) {
        return {
          transform: 'scale' + (layout === 'vertical' ? 'X' : 'Y') + '(' + (isBegin ? 0 : 1) + ')'
        };
      };

      return data.map(function (entry, index) {
        var width = entry.width;
        var height = entry.height;

        var props = _extends({}, baseProps, entry, { index: index }, (0, _ReactUtils.filterEventsOfChild)(_this2.props, entry, index));
        var transformOrigin = '';

        if (layout === 'vertical') {
          transformOrigin = width > 0 ? 'left center' : 'right center';
        } else {
          transformOrigin = height > 0 ? 'center bottom' : 'center top';
        }

        return _react2.default.createElement(
          _reactSmooth2.default,
          {
            begin: animationBegin,
            duration: animationDuration,
            isActive: isAnimationActive,
            easing: animationEasing,
            from: getStyle(true),
            to: getStyle(false),
            key: 'rectangle-' + index + '-' + animationId,
            onAnimationEnd: _this2.handleAnimationEnd,
            onAnimationStart: _this2.handleAnimationStart
          },
          _react2.default.createElement(
            'g',
            { style: { transformOrigin: transformOrigin } },
            _this2.renderRectangle(shape, props)
          )
        );
      });
    }
  }, {
    key: 'renderLabelItem',
    value: function renderLabelItem(option, props, value) {
      var labelItem = void 0;

      if (_react2.default.isValidElement(option)) {
        labelItem = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        labelItem = option(props);
      } else {
        labelItem = _react2.default.createElement(
          _Text2.default,
          _extends({}, props, {
            key: props.key,
            className: 'recharts-bar-label'
          }),
          (0, _isArray3.default)(value) ? value[1] : value
        );
      }

      return labelItem;
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _this3 = this;

      var isAnimationActive = this.props.isAnimationActive;


      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _props2 = this.props;
      var data = _props2.data;
      var label = _props2.label;
      var layout = _props2.layout;

      var barProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);
      var textAnchor = layout === 'vertical' ? 'start' : 'middle';
      var labels = data.map(function (entry, i) {
        var x = 0;
        var y = 0;

        if (layout === 'vertical') {
          x = 5 + entry.x + entry.width;
          y = 5 + entry.y + entry.height / 2;
        } else {
          x = entry.x + entry.width / 2;
          y = entry.y - 5;
        }

        var labelProps = _extends({
          textAnchor: textAnchor
        }, barProps, entry, customLabelProps, {
          x: x,
          y: y,
          index: i,
          key: 'label-' + i,
          payload: entry
        });

        var labelValue = entry.value;
        if (label === true && entry.value && labelProps.label) {
          labelValue = labelProps.label;
        }
        return _this3.renderLabelItem(label, labelProps, labelValue);
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-bar-labels' },
        labels
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var data = _props3.data;
      var className = _props3.className;
      var label = _props3.label;


      if (!data || !data.length) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-bar', className);

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-bar-rectangles' },
          this.renderRectangles()
        ),
        label && _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-bar-rectangle-labels' },
          this.renderLabels()
        )
      );
    }
  }]);

  return Bar;
}(_react.Component), _class2.displayName = 'Bar', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  layout: _react.PropTypes.oneOf(['vertical', 'horizontal']),
  xAxisId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  yAxisId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  stackId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  barSize: _react.PropTypes.number,
  unit: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  legendType: _react.PropTypes.oneOf(['line', 'square', 'rect', 'circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']),
  minPointSize: _react.PropTypes.number,

  shape: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.element]),
  label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func, _react.PropTypes.object, _react.PropTypes.element]),
  data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    radius: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array])
  })),
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onClick: _react.PropTypes.func,

  animationId: _react.PropTypes.number,
  isAnimationActive: _react.PropTypes.bool,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  fill: '#000',
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  minPointSize: 0,
  // data of bar
  data: [],
  layout: 'vertical',
  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp2)) || _class;

exports.default = Bar;