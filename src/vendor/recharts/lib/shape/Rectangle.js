'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Rectangle
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getRectangePath = function getRectangePath(x, y, width, height, radius) {
  var maxRadius = Math.min(width / 2, height / 2);
  var newRadius = [];
  var path = void 0;

  if (maxRadius > 0 && radius instanceof Array) {
    for (var i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }

    path = 'M' + x + ',' + (y + newRadius[0]);

    if (newRadius[0] > 0) {
      path += 'A ' + newRadius[0] + ',' + newRadius[0] + ',0,0,1,' + (x + newRadius[0]) + ',' + y;
    }

    path += 'L ' + (x + width - newRadius[1]) + ',' + y;

    if (newRadius[1] > 0) {
      path += 'A ' + newRadius[1] + ',' + newRadius[1] + ',0,0,1,' + (x + width) + ',' + (y + newRadius[1]);
    }
    path += 'L ' + (x + width) + ',' + (y + height - newRadius[2]);

    if (newRadius[2] > 0) {
      path += 'A ' + newRadius[2] + ',' + newRadius[2] + ',0,0,1,' + (x + width - newRadius[2]) + ',' + (y + height);
    }
    path += 'L ' + (x + newRadius[3]) + ',' + (y + height);

    if (newRadius[3] > 0) {
      path += 'A ' + newRadius[3] + ',' + newRadius[3] + ',0,0,1,' + x + ',' + (y + height - newRadius[3]);
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    newRadius = radius > maxRadius ? maxRadius : radius;

    path = 'M ' + x + ',' + (y + newRadius) + ' A ' + newRadius + ',' + newRadius + ',0,0,1,' + (x + newRadius) + ',' + y + '\n            L ' + (x + width - newRadius) + ',' + y + '\n            A ' + newRadius + ',' + newRadius + ',0,0,1,' + (x + width) + ',' + (y + newRadius) + '\n            L ' + (x + width) + ',' + (y + height - newRadius) + '\n            A ' + newRadius + ',' + newRadius + ',0,0,1,' + (x + width - newRadius) + ',' + (y + height) + '\n            L ' + (x + newRadius) + ',' + (y + height) + '\n            A ' + newRadius + ',' + newRadius + ',0,0,1,' + x + ',' + (y + height - newRadius) + ' Z';
  } else {
    path = 'M ' + x + ',' + y + ' h ' + width + ' v ' + height + ' h ' + -width + ' Z';
  }

  return path;
};

var Rectangle = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Rectangle, _Component);

  function Rectangle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Rectangle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      totalLength: -1
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rectangle, [{
    key: 'componentDidMount',


    /* eslint-disable  react/no-did-mount-set-state */
    value: function componentDidMount() {
      var path = (0, _reactDom.findDOMNode)(this);

      var totalLength = path && path.getTotalLength && path.getTotalLength();

      if (totalLength) {
        this.setState({
          totalLength: totalLength
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var x = _props.x;
      var y = _props.y;
      var width = _props.width;
      var height = _props.height;
      var radius = _props.radius;
      var className = _props.className;
      var totalLength = this.state.totalLength;
      var _props2 = this.props;
      var animationEasing = _props2.animationEasing;
      var animationDuration = _props2.animationDuration;
      var animationBegin = _props2.animationBegin;
      var isAnimationActive = _props2.isAnimationActive;
      var isUpdateAnimationActive = _props2.isUpdateAnimationActive;


      if (x !== +x || y !== +y || width !== +width || height !== +height) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-rectangle', className);

      return _react2.default.createElement(
        _reactSmooth2.default,
        {
          canBegin: totalLength > 0,
          from: { width: width, height: height, x: x, y: y },
          to: { width: width, height: height, x: x, y: y },
          duration: animationDuration,
          animationEasing: animationEasing,
          isActive: isUpdateAnimationActive
        },
        function (_ref2) {
          var currWidth = _ref2.width;
          var currHeight = _ref2.height;
          var currX = _ref2.x;
          var currY = _ref2.y;
          return _react2.default.createElement(
            _reactSmooth2.default,
            {
              canBegin: totalLength > 0,
              from: '0px ' + (totalLength === -1 ? 1 : totalLength) + 'px',
              to: totalLength + 'px 0px',
              attributeName: 'strokeDasharray',
              begin: animationBegin,
              duration: animationDuration,
              isActive: isAnimationActive,
              easing: animationEasing
            },
            _react2.default.createElement('path', _extends({}, (0, _ReactUtils.getPresentationAttributes)(_this2.props), (0, _ReactUtils.filterEventAttributes)(_this2.props), {
              className: layerClass,
              d: getRectangePath(currX, currY, currWidth, currHeight, radius)
            }))
          );
        }
      );
    }
  }]);

  return Rectangle;
}(_react.Component), _class2.displayName = 'Rectangle', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  x: _react.PropTypes.number,
  y: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  radius: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
  isAnimationActive: _react.PropTypes.bool,
  isUpdateAnimationActive: _react.PropTypes.bool,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  stroke: 'none',
  strokeWidth: 1,
  strokeDasharray: 'none',
  fill: '#000',
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp2)) || _class;

exports.default = Rectangle;