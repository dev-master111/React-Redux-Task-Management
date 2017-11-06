'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Polar Grid
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _PolarUtils = require('../util/PolarUtils');

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolarGrid = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(PolarGrid, _Component);

  function PolarGrid() {
    _classCallCheck(this, PolarGrid);

    return _possibleConstructorReturn(this, (PolarGrid.__proto__ || Object.getPrototypeOf(PolarGrid)).apply(this, arguments));
  }

  _createClass(PolarGrid, [{
    key: 'renderPolarAngles',


    /**
     * Draw axis of radial line
     * @return {[type]} The lines
     */
    value: function renderPolarAngles() {
      var _props = this.props;
      var cx = _props.cx;
      var cy = _props.cy;
      var innerRadius = _props.innerRadius;
      var outerRadius = _props.outerRadius;
      var polarAngles = _props.polarAngles;


      if (!polarAngles || !polarAngles.length) {
        return null;
      }
      var props = _extends({
        stroke: '#ccc'
      }, (0, _ReactUtils.getPresentationAttributes)(this.props));

      return _react2.default.createElement(
        'g',
        { className: 'recharts-polar-grid-angle' },
        polarAngles.map(function (entry, i) {
          var start = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, entry);
          var end = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, entry);

          return _react2.default.createElement('line', _extends({}, props, {
            key: 'line-' + i,
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
          }));
        })
      );
    }
    /**
     * Draw concentric circles
     * @param {Number} radius The radius of circle
     * @param {Number} index  The index of circle
     * @return {ReactElement} circle
     */

  }, {
    key: 'renderConcentricCircle',
    value: function renderConcentricCircle(radius, index) {
      var _props2 = this.props;
      var cx = _props2.cx;
      var cy = _props2.cy;

      var props = _extends({
        stroke: '#ccc',
        fill: 'none'
      }, (0, _ReactUtils.getPresentationAttributes)(this.props));

      return _react2.default.createElement('circle', _extends({}, props, {
        className: 'recharts-polar-grid-concentric-circle',
        key: 'circle-' + index,
        cx: cx,
        cy: cy,
        r: radius
      }));
    }

    /**
     * Draw concentric polygons
     * @param {Number} radius The radius of polygon
     * @param {Number} index  The index of polygon
     * @return {ReactElement} polygon
     */

  }, {
    key: 'renderConcentricPolygon',
    value: function renderConcentricPolygon(radius, index) {
      var _props3 = this.props;
      var cx = _props3.cx;
      var cy = _props3.cy;
      var polarAngles = _props3.polarAngles;

      var props = _extends({
        stroke: '#ccc',
        fill: 'none'
      }, (0, _ReactUtils.getPresentationAttributes)(this.props));
      var path = '';

      polarAngles.forEach(function (angle, i) {
        var point = (0, _PolarUtils.polarToCartesian)(cx, cy, radius, angle);

        if (i) {
          path += 'L ' + point.x + ',' + point.y;
        } else {
          path += 'M ' + point.x + ',' + point.y;
        }
      });
      path += 'Z';

      return _react2.default.createElement('path', _extends({}, props, {
        className: 'recharts-polar-grid-concentric-polygon',
        key: 'path-' + index,
        d: path
      }));
    }

    /**
     * Draw concentric axis
     * @return {ReactElement} Concentric axis
     * @todo Optimize the name
     */

  }, {
    key: 'renderConcentricPath',
    value: function renderConcentricPath() {
      var _this2 = this;

      var _props4 = this.props;
      var polarRadius = _props4.polarRadius;
      var gridType = _props4.gridType;


      if (!polarRadius || !polarRadius.length) {
        return null;
      }

      return _react2.default.createElement(
        'g',
        { className: 'recharts-polar-grid-concentric' },
        polarRadius.map(function (entry, i) {
          return gridType === 'circle' ? _this2.renderConcentricCircle(entry, i) : _this2.renderConcentricPolygon(entry, i);
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var outerRadius = this.props.outerRadius;


      if (outerRadius <= 0) {
        return null;
      }

      return _react2.default.createElement(
        'g',
        { className: 'recharts-polar-grid' },
        this.renderPolarAngles(),
        this.renderConcentricPath()
      );
    }
  }]);

  return PolarGrid;
}(_react.Component), _class2.displayName = 'PolarGrid', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  cx: _react.PropTypes.number,
  cy: _react.PropTypes.number,
  innerRadius: _react.PropTypes.number,
  outerRadius: _react.PropTypes.number,

  polarAngles: _react.PropTypes.arrayOf(_react.PropTypes.number),
  polarRadius: _react.PropTypes.arrayOf(_react.PropTypes.number),
  gridType: _react.PropTypes.oneOf(['polygon', 'circle'])
}), _class2.defaultProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  gridType: 'polygon'
}, _temp)) || _class;

exports.default = PolarGrid;