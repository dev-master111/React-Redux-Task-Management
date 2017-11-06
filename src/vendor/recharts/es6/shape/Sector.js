'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Sector
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ReactUtils = require('../util/ReactUtils');

var _PolarUtils = require('../util/PolarUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
  var sign = Math.sign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);

  return sign * deltaAngle;
};

var getSectorPath = function getSectorPath(_ref) {
  var cx = _ref.cx;
  var cy = _ref.cy;
  var innerRadius = _ref.innerRadius;
  var outerRadius = _ref.outerRadius;
  var startAngle = _ref.startAngle;
  var endAngle = _ref.endAngle;

  var angle = getDeltaAngle(startAngle, endAngle);

  // When the angle of sector equals to 360, star point and end point coincide
  var tempEndAngle = startAngle + angle;
  var outerStartPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, startAngle);
  var outerEndPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, tempEndAngle);

  var path = void 0;

  if (innerRadius > 0) {
    var innerStartPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, startAngle);
    var innerEndPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, tempEndAngle);
    path = 'M ' + outerStartPoint.x + ',' + outerStartPoint.y + '\n            A ' + outerRadius + ',' + outerRadius + ',0,\n            ' + +(Math.abs(angle) > 180) + ',' + +(startAngle > tempEndAngle) + ',\n            ' + outerEndPoint.x + ',' + outerEndPoint.y + '\n            L ' + innerEndPoint.x + ',' + innerEndPoint.y + '\n            A ' + innerRadius + ',' + innerRadius + ',0,\n            ' + +(Math.abs(angle) > 180) + ',' + +(startAngle <= tempEndAngle) + ',\n            ' + innerStartPoint.x + ',' + innerStartPoint.y + ' Z';
  } else {
    path = 'M ' + outerStartPoint.x + ',' + outerStartPoint.y + '\n            A ' + outerRadius + ',' + outerRadius + ',0,\n            ' + +(Math.abs(angle) > 180) + ',' + +(startAngle > tempEndAngle) + ',\n            ' + outerEndPoint.x + ',' + outerEndPoint.y + '\n            L ' + cx + ',' + cy + ' Z';
  }

  return path;
};

var Sector = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Sector, _Component);

  function Sector() {
    _classCallCheck(this, Sector);

    return _possibleConstructorReturn(this, (Sector.__proto__ || Object.getPrototypeOf(Sector)).apply(this, arguments));
  }

  _createClass(Sector, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var cx = _props.cx;
      var cy = _props.cy;
      var innerRadius = _props.innerRadius;
      var outerRadius = _props.outerRadius;
      var startAngle = _props.startAngle;
      var endAngle = _props.endAngle;
      var className = _props.className;


      if (outerRadius < innerRadius || startAngle === endAngle) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-sector', className);

      return _react2.default.createElement('path', _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), (0, _ReactUtils.filterEventAttributes)(this.props), {
        className: layerClass,
        d: getSectorPath({ cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle })
      }));
    }
  }]);

  return Sector;
}(_react.Component), _class2.displayName = 'Sector', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  cx: _react.PropTypes.number,
  cy: _react.PropTypes.number,
  innerRadius: _react.PropTypes.number,
  outerRadius: _react.PropTypes.number,
  startAngle: _react.PropTypes.number,
  endAngle: _react.PropTypes.number
}), _class2.defaultProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0
}, _temp)) || _class;

exports.default = Sector;