'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChart = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Bar Chart
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Tooltip = require('../component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Rectangle = require('../shape/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _DataUtils = require('../util/DataUtils');

var _ReactUtils = require('../util/ReactUtils');

var _generateCategoricalChart = require('./generateCategoricalChart');

var _generateCategoricalChart2 = _interopRequireDefault(_generateCategoricalChart);

var _Cell = require('../component/Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _Bar = require('../cartesian/Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _CartesianUtils = require('../util/CartesianUtils');

var _AnimationDecorator = require('../util/AnimationDecorator');

var _AnimationDecorator2 = _interopRequireDefault(_AnimationDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = (0, _AnimationDecorator2.default)(_class = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(BarChart, _Component);

  function BarChart() {
    _classCallCheck(this, BarChart);

    return _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).apply(this, arguments));
  }

  _createClass(BarChart, [{
    key: 'getComposedData',


    /**
     * Compose the data of each group
     * @param  {Object} item        An instance of Bar
     * @param  {Array}  barPosition The offset and size of each bar
     * @param  {Object} xAxis       The configuration of x-axis
     * @param  {Object} yAxis       The configuration of y-axis
     * @param  {Object} offset      The offset of main part in the svg element
     * @param  {Array} stackedData  The stacked data of a bar item
     * @return {Array} Composed data
     */
    value: function getComposedData(item, barPosition, xAxis, yAxis, offset, stackedData) {
      var _props = this.props;
      var layout = _props.layout;
      var dataStartIndex = _props.dataStartIndex;
      var dataEndIndex = _props.dataEndIndex;
      var _item$props = item.props;
      var dataKey = _item$props.dataKey;
      var children = _item$props.children;
      var minPointSize = _item$props.minPointSize;

      var pos = barPosition[dataKey];
      var data = this.props.data.slice(dataStartIndex, dataEndIndex + 1);
      var xTicks = (0, _CartesianUtils.getTicksOfAxis)(xAxis);
      var yTicks = (0, _CartesianUtils.getTicksOfAxis)(yAxis);
      var baseValue = this.getBaseValue(xAxis, yAxis);
      var hasStack = stackedData && stackedData.length;
      var cells = (0, _ReactUtils.findAllByType)(children, _Cell2.default);

      return data.map(function (entry, index) {
        var value = stackedData ? stackedData[dataStartIndex + index] : [baseValue, entry[dataKey]];
        var x = void 0;
        var y = void 0;
        var width = void 0;
        var height = void 0;

        if (layout === 'horizontal') {
          x = xTicks[index].coordinate + pos.offset;
          y = yAxis.scale(xAxis.orientation === 'top' ? value[0] : value[1]);
          width = pos.size;
          height = xAxis.orientation === 'top' ? yAxis.scale(value[1]) - yAxis.scale(value[0]) : yAxis.scale(value[0]) - yAxis.scale(value[1]);
          if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
            var delta = Math.sign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));

            y -= delta;
            height += delta;
          }
        } else {
          x = xAxis.scale(yAxis.orientation === 'left' ? value[0] : value[1]);
          y = yTicks[index].coordinate + pos.offset;
          width = yAxis.orientation === 'left' ? xAxis.scale(value[1]) - xAxis.scale(value[0]) : xAxis.scale(value[0]) - xAxis.scale(value[1]);
          height = pos.size;

          if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
            var _delta = Math.sign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
            width += _delta;
          }
        }

        return _extends({}, entry, {
          x: x, y: y, width: width, height: height, value: stackedData ? value : value[1]
        }, cells && cells[index] && cells[index].props);
      });
    }
  }, {
    key: 'getBaseValue',
    value: function getBaseValue(xAxis, yAxis) {
      var layout = this.props.layout;

      var numberAxis = layout === 'horizontal' ? yAxis : xAxis;
      var domain = numberAxis.scale.domain();

      if (numberAxis.type === 'number') {
        return Math.max(Math.min(domain[0], domain[1]), 0);
      }

      return domain[0];
    }

    /**
     * Calculate the size of each bar and the gap between two bars
     * @param  {Number}   bandSize  The size of each category
     * @param  {sizeList} sizeList  The size of all groups
     * @return {Number} The size of each bar and the gap between two bars
     */

  }, {
    key: 'getBarPosition',
    value: function getBarPosition(bandSize, sizeList) {
      var _props2 = this.props;
      var barGap = _props2.barGap;
      var barCategoryGap = _props2.barCategoryGap;

      var len = sizeList.length;
      var result = void 0;

      // whether or not is barSize setted by user
      if (sizeList[0].barSize === +sizeList[0].barSize) {
        (function () {
          var sum = sizeList.reduce(function (res, entry) {
            return res + entry.barSize || 0;
          }, 0);
          sum += (len - 1) * barGap;
          var offset = (bandSize - sum) / 2 >> 0;
          var prev = { offset: offset - barGap, size: 0 };

          result = sizeList.reduce(function (res, entry) {
            var newRes = _extends({}, res, _defineProperty({}, entry.dataKey, {
              offset: prev.offset + prev.size + barGap,
              size: entry.barSize
            }));

            prev = newRes[entry.dataKey];

            if (entry.stackList && entry.stackList.length) {
              entry.stackList.forEach(function (key) {
                newRes[key] = newRes[entry.dataKey];
              });
            }
            return newRes;
          }, {});
        })();
      } else {
        (function () {
          var offset = (0, _DataUtils.getPercentValue)(barCategoryGap, bandSize, 0, true);
          var size = (bandSize - 2 * offset - (len - 1) * barGap) / len >> 0;

          result = sizeList.reduce(function (res, entry, i) {
            var newRes = _extends({}, res, _defineProperty({}, entry.dataKey, {
              offset: offset + (size + barGap) * i,
              size: size
            }));

            if (entry.stackList && entry.stackList.length) {
              entry.stackList.forEach(function (key) {
                newRes[key] = newRes[entry.dataKey];
              });
            }
            return newRes;
          }, {});
        })();
      }

      return result;
    }

    /**
     * Calculate the size of all groups
     * @param  {Object} stackGroups The items grouped by axisId and stackId
     * @return {Object} The size of all groups
     */

  }, {
    key: 'getSizeList',
    value: function getSizeList(stackGroups) {
      var _props3 = this.props;
      var layout = _props3.layout;
      var barSize = _props3.barSize;

      var result = {};
      var numericAxisIds = Object.keys(stackGroups);

      for (var i = 0, len = numericAxisIds.length; i < len; i++) {
        var sgs = stackGroups[numericAxisIds[i]].stackGroups;
        var stackIds = Object.keys(sgs);

        for (var j = 0, sLen = stackIds.length; j < sLen; j++) {
          var _sgs$stackIds$j = sgs[stackIds[j]];
          var items = _sgs$stackIds$j.items;
          var numericAxisId = _sgs$stackIds$j.numericAxisId;
          var cateAxisId = _sgs$stackIds$j.cateAxisId;


          var barItems = items.filter(function (item) {
            return item.type.displayName === 'Bar';
          });

          if (barItems && barItems.length) {
            var dataKey = barItems[0].props.dataKey;

            var cateId = barItems[0].props[cateAxisId];

            if (!result[cateId]) {
              result[cateId] = [];
            }

            result[cateId].push({
              dataKey: dataKey,
              stackList: barItems.slice(1).map(function (item) {
                return item.props.dataKey;
              }),
              barSize: barItems[0].props.barSize || barSize
            });
          }
        }
      }

      return result;
    }
  }, {
    key: 'renderCursor',
    value: function renderCursor(xAxisMap, yAxisMap, offset) {
      var _props4 = this.props;
      var children = _props4.children;
      var isTooltipActive = _props4.isTooltipActive;
      var layout = _props4.layout;
      var activeTooltipIndex = _props4.activeTooltipIndex;

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
      var bandSize = axis.scale.bandwidth();
      var cursorProps = _extends({
        fill: '#f1f1f1'
      }, (0, _ReactUtils.getPresentationAttributes)(tooltipItem.props.cursor), {
        x: layout === 'horizontal' ? start : offset.left + 0.5,
        y: layout === 'horizontal' ? offset.top + 0.5 : start,
        width: layout === 'horizontal' ? bandSize : offset.width - 1,
        height: layout === 'horizontal' ? offset.height - 1 : bandSize
      });

      return _react2.default.isValidElement(tooltipItem.props.cursor) ? _react2.default.cloneElement(tooltipItem.props.cursor, cursorProps) : _react2.default.createElement(_Rectangle2.default, _extends({}, cursorProps, { className: 'recharts-bar-cursor' }));
    }

    /**
     * Draw the main part of bar chart
     * @param  {Array} items     All the instance of Bar
     * @param  {Object} xAxisMap The configuration of all x-axis
     * @param  {Object} yAxisMap The configuration of all y-axis
     * @param  {Object} offset   The offset of main part in the svg element
     * @param  {Object} stackGroups The items grouped by axisId and stackId
     * @return {ReactComponent}  All the instances of Bar
     */

  }, {
    key: 'renderItems',
    value: function renderItems(items, xAxisMap, yAxisMap, offset, stackGroups) {
      var _this2 = this;

      if (!items || !items.length) {
        return null;
      }

      var layout = this.props.layout;

      var sizeList = this.getSizeList(stackGroups);
      var animationId = this.props.animationId;


      var barPositionMap = {};

      return items.map(function (child, i) {
        var _child$props = child.props;
        var xAxisId = _child$props.xAxisId;
        var yAxisId = _child$props.yAxisId;

        var numericAxisId = layout === 'horizontal' ? yAxisId : xAxisId;
        var cateAxisId = layout === 'horizontal' ? xAxisId : yAxisId;
        var cateAxis = layout === 'horizontal' ? xAxisMap[xAxisId] : yAxisMap[yAxisId];
        var bandSize = (0, _DataUtils.getBandSizeOfScale)(cateAxis.scale);
        var barPosition = barPositionMap[cateAxisId] || _this2.getBarPosition(bandSize, sizeList[cateAxisId]);
        var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && (0, _CartesianUtils.getStackedDataOfItem)(child, stackGroups[numericAxisId].stackGroups);

        return _react2.default.cloneElement(child, _extends({
          key: 'bar-' + i
        }, (0, _ReactUtils.filterEventAttributes)(_this2.props), {
          layout: layout,
          animationId: animationId,
          data: _this2.getComposedData(child, barPosition, xAxisMap[xAxisId], yAxisMap[yAxisId], offset, stackedData)
        }));
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var isComposed = _props5.isComposed;
      var graphicalItems = _props5.graphicalItems;
      var xAxisMap = _props5.xAxisMap;
      var yAxisMap = _props5.yAxisMap;
      var offset = _props5.offset;
      var stackGroups = _props5.stackGroups;


      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-bar-graphical' },
        !isComposed && this.renderCursor(xAxisMap, yAxisMap, offset),
        this.renderItems(graphicalItems, xAxisMap, yAxisMap, offset, stackGroups)
      );
    }
  }]);

  return BarChart;
}(_react.Component), _class2.displayName = 'BarChart', _class2.propTypes = {
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
  barCategoryGap: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  barGap: _react.PropTypes.number,
  barSize: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  // used internally
  isComposed: _react.PropTypes.bool,
  animationId: _react.PropTypes.number
}, _class2.defaultProps = {
  barCategoryGap: '10%',
  barGap: 4
}, _temp)) || _class) || _class;

exports.default = (0, _generateCategoricalChart2.default)(BarChart, _Bar2.default);
exports.BarChart = BarChart;