'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaChart = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Area Chart
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Tooltip = require('../component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Dot = require('../shape/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Curve = require('../shape/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

var _ReactUtils = require('../util/ReactUtils');

var _CartesianUtils = require('../util/CartesianUtils');

var _generateCategoricalChart = require('./generateCategoricalChart');

var _generateCategoricalChart2 = _interopRequireDefault(_generateCategoricalChart);

var _Area = require('../cartesian/Area');

var _Area2 = _interopRequireDefault(_Area);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _DataUtils = require('../util/DataUtils');

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _AnimationDecorator = require('../util/AnimationDecorator');

var _AnimationDecorator2 = _interopRequireDefault(_AnimationDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaChart = (0, _AnimationDecorator2.default)(_class = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(AreaChart, _Component);

  function AreaChart() {
    _classCallCheck(this, AreaChart);

    return _possibleConstructorReturn(this, (AreaChart.__proto__ || Object.getPrototypeOf(AreaChart)).apply(this, arguments));
  }

  _createClass(AreaChart, [{
    key: 'getComposedData',


    /**
     * Compose the data of each area
     * @param  {Object} xAxis       The configuration of x-axis
     * @param  {Object} yAxis       The configuration of y-axis
     * @param  {String} dataKey     The unique key of a group
     * @param  {Array}  stackedData If the area is stacked,
     * the stackedData is an array of min value and max value
     * @return {Array} Composed data
     */
    value: function getComposedData(xAxis, yAxis, dataKey, stackedData) {
      var _props = this.props;
      var layout = _props.layout;
      var dataStartIndex = _props.dataStartIndex;
      var dataEndIndex = _props.dataEndIndex;

      var data = this.props.data.slice(dataStartIndex, dataEndIndex + 1);
      var xTicks = (0, _CartesianUtils.getTicksOfAxis)(xAxis);
      var yTicks = (0, _CartesianUtils.getTicksOfAxis)(yAxis);
      var bandSize = (0, _DataUtils.getBandSizeOfScale)(layout === 'horizontal' ? xAxis.scale : yAxis.scale);
      var hasStack = stackedData && stackedData.length;
      var baseValue = this.getBaseValue(xAxis, yAxis);

      var points = data.map(function (entry, index) {
        var value = hasStack ? stackedData[dataStartIndex + index] : [baseValue, entry[dataKey]];

        if (layout === 'horizontal') {
          return {
            x: xTicks[index].coordinate + bandSize / 2,
            y: (0, _isNil3.default)(value[1]) ? null : yAxis.scale(value[1]),
            value: value
          };
        }

        return {
          x: (0, _isNil3.default)(value[1]) ? null : xAxis.scale(value[1]),
          y: yTicks[index].coordinate + bandSize / 2,
          value: value
        };
      });

      var baseLine = void 0;
      if (hasStack) {
        baseLine = stackedData.slice(dataStartIndex, dataEndIndex + 1).map(function (entry, index) {
          return {
            x: layout === 'horizontal' ? xTicks[index].coordinate + bandSize / 2 : xAxis.scale(entry[0]),
            y: layout === 'horizontal' ? yAxis.scale(entry[0]) : yTicks[index].coordinate + bandSize / 2
          };
        });
      } else if (layout === 'horizontal') {
        baseLine = yAxis.scale(baseValue);
      } else {
        baseLine = xAxis.scale(baseValue);
      }

      return { points: points, baseLine: baseLine, layout: layout };
    }
  }, {
    key: 'getBaseValue',
    value: function getBaseValue(xAxis, yAxis) {
      var layout = this.props.layout;

      var numberAxis = layout === 'horizontal' ? yAxis : xAxis;
      var domain = numberAxis.scale.domain();

      if (numberAxis.type === 'number') {
        var max = Math.max(domain[0], domain[1]);
        return max < 0 ? max : Math.max(Math.min(domain[0], domain[1]), 0);
      }

      return domain[0];
    }
  }, {
    key: 'renderCursor',
    value: function renderCursor(xAxisMap, yAxisMap, offset) {
      var _props2 = this.props;
      var children = _props2.children;
      var isTooltipActive = _props2.isTooltipActive;
      var layout = _props2.layout;
      var activeTooltipIndex = _props2.activeTooltipIndex;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

      if (!tooltipItem || !tooltipItem.props.cursor || !isTooltipActive || activeTooltipIndex < 0) {
        return null;
      }

      var axisMap = layout === 'horizontal' ? xAxisMap : yAxisMap;
      var axis = (0, _DataUtils.getAnyElementOfObject)(axisMap);
      var ticks = (0, _CartesianUtils.getTicksOfAxis)(axis);

      if (!ticks || !ticks[activeTooltipIndex]) {
        return null;
      }

      var start = ticks[activeTooltipIndex].coordinate;
      var x1 = layout === 'horizontal' ? start : offset.left;
      var y1 = layout === 'horizontal' ? offset.top : start;
      var x2 = layout === 'horizontal' ? start : offset.left + offset.width;
      var y2 = layout === 'horizontal' ? offset.top + offset.height : start;
      var cursorProps = _extends({
        stroke: '#ccc'
      }, (0, _ReactUtils.getPresentationAttributes)(tooltipItem.props.cursor), {
        points: [{ x: x1, y: y1 }, { x: x2, y: y2 }]
      });

      return _react2.default.isValidElement(tooltipItem.props.cursor) ? _react2.default.cloneElement(tooltipItem.props.cursor, cursorProps) : _react2.default.createElement(_Curve2.default, _extends({}, cursorProps, { type: 'linear', className: 'recharts-tooltip-cursor' }));
    }
  }, {
    key: 'renderActiveDot',
    value: function renderActiveDot(option, props) {
      var dot = void 0;

      if (_react2.default.isValidElement(option)) {
        dot = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        dot = option(props);
      } else {
        dot = _react2.default.createElement(_Dot2.default, props);
      }

      return _react2.default.createElement(
        _reactSmooth2.default,
        {
          from: 'scale(0)',
          to: 'scale(1)',
          duration: 400,
          key: 'dot-' + props.dataKey,
          attributeName: 'transform'
        },
        _react2.default.createElement(
          _Layer2.default,
          { style: { transformOrigin: 'center center' } },
          dot
        )
      );
    }

    /**
     * Draw the main part of area chart
     * @param  {Array} items     React elements of Area
     * @param  {Object} xAxisMap The configuration of all x-axis
     * @param  {Object} yAxisMap The configuration of all y-axis
     * @param  {Object} offset   The offset of main part in the svg element
     * @param  {Object} stackGroups The items grouped by axisId and stackId
     * @return {ReactComponent} The instances of Area
     */

  }, {
    key: 'renderItems',
    value: function renderItems(items, xAxisMap, yAxisMap, offset, stackGroups) {
      var _this2 = this;

      var _props3 = this.props;
      var children = _props3.children;
      var layout = _props3.layout;
      var isTooltipActive = _props3.isTooltipActive;
      var activeTooltipIndex = _props3.activeTooltipIndex;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);
      var hasDot = tooltipItem && isTooltipActive;
      var dotItems = [];
      var animationId = this.props.animationId;


      var areaItems = items.reduce(function (result, child, i) {
        var _child$props = child.props;
        var xAxisId = _child$props.xAxisId;
        var yAxisId = _child$props.yAxisId;
        var dataKey = _child$props.dataKey;
        var fillOpacity = _child$props.fillOpacity;
        var fill = _child$props.fill;
        var activeDot = _child$props.activeDot;

        var numericAxisId = layout === 'horizontal' ? yAxisId : xAxisId;
        var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && (0, _CartesianUtils.getStackedDataOfItem)(child, stackGroups[numericAxisId].stackGroups);
        var composeData = _this2.getComposedData(xAxisMap[xAxisId], yAxisMap[yAxisId], dataKey, stackedData);
        var activePoint = composeData.points && composeData.points[activeTooltipIndex];

        if (hasDot && activeDot && activePoint) {
          var dotProps = _extends({
            index: i,
            dataKey: dataKey,
            animationId: animationId,
            cx: activePoint.x, cy: activePoint.y, r: 4,
            fill: (0, _CartesianUtils.getMainColorOfGraphicItem)(child),
            strokeWidth: 2, stroke: '#fff'
          }, (0, _ReactUtils.getPresentationAttributes)(activeDot));
          dotItems.push(_react2.default.createElement(
            _Layer2.default,
            { key: 'dot-' + dataKey },
            _this2.renderActiveDot(activeDot, dotProps)
          ));
        }

        var area = _react2.default.cloneElement(child, _extends({
          key: 'area-' + i
        }, offset, composeData, {
          animationId: animationId,
          layout: layout
        }));

        return [].concat(_toConsumableArray(result), [area]);
      }, []);

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-area-chart-group' },
        _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-area-chart-shapes' },
          areaItems
        ),
        _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-area-chart-dots' },
          dotItems
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var isComposed = _props4.isComposed;
      var graphicalItems = _props4.graphicalItems;
      var xAxisMap = _props4.xAxisMap;
      var yAxisMap = _props4.yAxisMap;
      var offset = _props4.offset;
      var stackGroups = _props4.stackGroups;


      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-area-graphical' },
        !isComposed && this.renderCursor(xAxisMap, yAxisMap, offset),
        this.renderItems(graphicalItems, xAxisMap, yAxisMap, offset, stackGroups)
      );
    }
  }]);

  return AreaChart;
}(_react.Component), _class2.displayName = 'AreaChart', _class2.propTypes = {
  layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  dataStartIndex: _react.PropTypes.number,
  dataEndIndex: _react.PropTypes.number,
  data: _react.PropTypes.array,
  isTooltipActive: _react.PropTypes.bool,
  activeTooltipIndex: _react.PropTypes.number,
  xAxisMap: _react.PropTypes.object,
  yAxisMap: _react.PropTypes.object,
  offset: _react.PropTypes.object,
  graphicalItems: _react.PropTypes.array,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  stackGroups: _react.PropTypes.object,
  // used internally
  isComposed: _react.PropTypes.bool,
  animationId: _react.PropTypes.number
}, _temp)) || _class) || _class;

exports.default = (0, _generateCategoricalChart2.default)(AreaChart, _Area2.default);
exports.AreaChart = AreaChart;