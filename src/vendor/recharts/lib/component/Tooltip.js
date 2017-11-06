'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @fileOverview Tooltip
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _DefaultTooltipContent = require('./DefaultTooltipContent');

var _DefaultTooltipContent2 = _interopRequireDefault(_DefaultTooltipContent);

var _DOMUtils = require('../util/DOMUtils');

var _ReactUtils = require('../util/ReactUtils');

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  content: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func]),
  viewBox: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number
  }),

  active: _react.PropTypes.bool,
  separator: _react.PropTypes.string,
  formatter: _react.PropTypes.func,
  offset: _react.PropTypes.number,

  itemStyle: _react.PropTypes.object,
  labelStyle: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  cursor: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.element, _react.PropTypes.object]),

  coordinate: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),

  label: _react.PropTypes.any,
  payload: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.any,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    unit: _react.PropTypes.any
  })),

  isAnimationActive: _react.PropTypes.bool,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
  itemSorter: _react.PropTypes.func
};

var defaultProps = {
  active: false,
  offset: 10,
  viewBox: { x1: 0, x2: 0, y1: 0, y2: 0 },
  coordinate: { x: 0, y: 0 },
  cursorStyle: {},
  separator: ' : ',
  wrapperStyle: {},
  itemStyle: {},
  labelStyle: {},
  cursor: true,
  isAnimationActive: true,
  animationEasing: 'ease',
  animationDuration: 400,
  itemSorter: function itemSorter(item1, item2) {
    return -1;
  }
};

var getTooltipBBox = function getTooltipBBox(wrapperStyle, contentItem) {
  if (!(0, _ReactUtils.isSsr)()) {
    var contentHtml = _server2.default.renderToStaticMarkup(contentItem);
    var style = _extends({
      // solve the problem temporarily that the width and height will be affect by the global css
      fontSize: 12
    }, wrapperStyle, {
      top: -20000,
      left: 0,
      display: 'block'
    });

    var wrapper = document.createElement('div');

    wrapper.setAttribute('style', (0, _DOMUtils.getStyleString)(style));
    wrapper.innerHTML = contentHtml;
    document.body.appendChild(wrapper);
    var box = wrapper.getBoundingClientRect();

    document.body.removeChild(wrapper);

    return box;
  }

  return null;
};

var renderContent = function renderContent(content, props) {
  if (_react2.default.isValidElement(content)) {
    return _react2.default.cloneElement(content, props);
  } else if ((0, _isFunction3.default)(content)) {
    return content(props);
  }

  return _react2.default.createElement(_DefaultTooltipContent2.default, props);
};

var Tooltip = (_temp = _class = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var payload = _props.payload;
      var isAnimationActive = _props.isAnimationActive;
      var animationDuration = _props.animationDuration;
      var animationEasing = _props.animationEasing;


      if (!payload || !payload.length || !payload.filter(function (entry) {
        return (0, _isNumber3.default)(entry.value) || (0, _isString3.default)(entry.value);
      }).length) {
        return null;
      }

      var _props2 = this.props;
      var content = _props2.content;
      var viewBox = _props2.viewBox;
      var coordinate = _props2.coordinate;
      var active = _props2.active;
      var offset = _props2.offset;
      var wrapperStyle = _props2.wrapperStyle;

      var outerStyle = _extends({
        pointerEvents: 'none',
        display: active ? 'block' : 'none',
        position: 'absolute',
        top: 0
      }, wrapperStyle);
      var contentItem = renderContent(content, this.props);
      var box = getTooltipBBox(outerStyle, contentItem);

      if (!box) {
        return null;
      }
      var translateX = Math.max(coordinate.x + box.width + offset > viewBox.x + viewBox.width ? coordinate.x - box.width - offset : coordinate.x + offset, viewBox.x);

      var translateY = Math.max(coordinate.y + box.height + offset > viewBox.y + viewBox.height ? coordinate.y - box.height - offset : coordinate.y + offset, viewBox.y);

      return _react2.default.createElement(
        _reactSmooth2.default,
        {
          from: 'translate(' + translateX + 'px, ' + translateY + 'px)',
          to: 'translate(' + translateX + 'px, ' + translateY + 'px)',
          duration: animationDuration,
          isActive: isAnimationActive,
          easing: animationEasing,
          attributeName: 'transform'
        },
        _react2.default.createElement(
          'div',
          {
            className: 'recharts-tooltip-wrapper',
            style: outerStyle
          },
          contentItem
        )
      );
    }
  }]);

  return Tooltip;
}(_react.Component), _class.displayName = 'Tooltip', _class.propTypes = propTypes, _class.defaultProps = defaultProps, _temp);
exports.default = Tooltip;