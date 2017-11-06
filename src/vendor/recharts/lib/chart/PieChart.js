'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Pie Chart
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Surface = require('../container/Surface');

var _Surface2 = _interopRequireDefault(_Surface);

var _Legend = require('../component/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _Tooltip = require('../component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Pie = require('../polar/Pie');

var _Pie2 = _interopRequireDefault(_Pie);

var _Cell = require('../component/Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _DataUtils = require('../util/DataUtils');

var _ReactUtils = require('../util/ReactUtils');

var _PolarUtils = require('../util/PolarUtils');

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(PieChart, _Component);

  function PieChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PieChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeTooltipLabel: '',
      activeTooltipCoord: { x: 0, y: 0 },
      activeTooltipPayload: [],
      isTooltipActive: false
    }, _this.handleMouseEnter = function (el, index, e) {
      var _this$props = _this.props;
      var children = _this$props.children;
      var onMouseEnter = _this$props.onMouseEnter;
      var cx = el.cx;
      var cy = el.cy;
      var outerRadius = el.outerRadius;
      var midAngle = el.midAngle;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

      if (tooltipItem) {
        _this.setState({
          isTooltipActive: true,
          activeTooltipCoord: (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, midAngle),
          activeTooltipPayload: [el]
        }, function () {
          if (onMouseEnter) {
            onMouseEnter(el, index, e);
          }
        });
      } else if (onMouseEnter) {
        onMouseEnter(el, index, e);
      }
    }, _this.handleMouseLeave = function (el, index, e) {
      var _this$props2 = _this.props;
      var children = _this$props2.children;
      var onMouseLeave = _this$props2.onMouseLeave;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

      if (tooltipItem) {
        _this.setState({
          isTooltipActive: false
        }, function () {
          if (onMouseLeave) {
            onMouseLeave(el, index, e);
          }
        });
      } else if (onMouseLeave) {
        onMouseLeave(el, index, e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PieChart, [{
    key: 'getComposedData',
    value: function getComposedData(item) {
      var _item$props = item.props;
      var data = _item$props.data;
      var children = _item$props.children;

      var props = (0, _ReactUtils.getPresentationAttributes)(item.props);
      var cells = (0, _ReactUtils.findAllByType)(children, _Cell2.default);

      if (data && data.length) {
        return data.map(function (entry, index) {
          return _extends({}, props, entry, cells && cells[index] && cells[index].props);
        });
      }

      if (cells && cells.length) {
        return cells.map(function (cell) {
          return _extends({}, props, cell.props);
        });
      }

      return [];
    }
  }, {
    key: 'renderLegend',

    /**
     * Draw legend
     * @param  {Array} items             The instances of Pie
     * @return {ReactElement}            The instance of Legend
     */
    value: function renderLegend(items) {
      var _this2 = this;

      var children = this.props.children;

      var legendItem = (0, _ReactUtils.findChildByType)(children, _Legend2.default);
      if (!legendItem) {
        return null;
      }

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var margin = _props.margin;

      var legendData = legendItem.props && legendItem.props.payload || items.reduce(function (result, child) {
        var nameKey = child.props.nameKey;

        var data = _this2.getComposedData(child);

        return result.concat(data.map(function (entry) {
          return _extends({}, entry, { type: child.props.legendType, value: entry[nameKey],
            color: entry.fill
          });
        }));
      }, []);

      return _react2.default.cloneElement(legendItem, _extends({}, _Legend2.default.getWithHeight(legendItem, width, height), {
        payload: legendData,
        chartWidth: width,
        chartHeight: height,
        margin: margin
      }));
    }
  }, {
    key: 'renderTooltip',
    value: function renderTooltip() {
      var children = this.props.children;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

      if (!tooltipItem) {
        return null;
      }

      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var _state = this.state;
      var isTooltipActive = _state.isTooltipActive;
      var activeTooltipLabel = _state.activeTooltipLabel;
      var activeTooltipCoord = _state.activeTooltipCoord;
      var activeTooltipPayload = _state.activeTooltipPayload;

      var viewBox = { x: 0, y: 0, width: width, height: height };

      return _react2.default.cloneElement(tooltipItem, {
        viewBox: viewBox,
        active: isTooltipActive,
        label: activeTooltipLabel,
        payload: activeTooltipPayload,
        coordinate: activeTooltipCoord
      });
    }

    /**
     * Draw the main part of bar chart
     * @param  {Array} items    All the instance of Pie
     * @return {ReactComponent} All the instance of Pie
     */

  }, {
    key: 'renderItems',
    value: function renderItems(items) {
      var _this3 = this;

      var _props3 = this.props;
      var width = _props3.width;
      var height = _props3.height;
      var margin = _props3.margin;
      var onClick = _props3.onClick;


      return items.map(function (child, i) {
        var _child$props = child.props;
        var innerRadius = _child$props.innerRadius;
        var outerRadius = _child$props.outerRadius;
        var data = _child$props.data;

        var cx = (0, _DataUtils.getPercentValue)(child.props.cx, width, width / 2);
        var cy = (0, _DataUtils.getPercentValue)(child.props.cy, height, height / 2);
        var maxRadius = (0, _PolarUtils.getMaxRadius)(width, height, margin);

        return _react2.default.cloneElement(child, {
          key: 'recharts-pie-' + i,
          cx: cx,
          cy: cy,
          maxRadius: child.props.maxRadius || Math.sqrt(width * width + height * height) / 2,
          innerRadius: (0, _DataUtils.getPercentValue)(innerRadius, maxRadius, 0),
          outerRadius: (0, _DataUtils.getPercentValue)(outerRadius, maxRadius, maxRadius * 0.8),
          composedData: _this3.getComposedData(child),
          onMouseEnter: _this3.handleMouseEnter,
          onMouseLeave: _this3.handleMouseLeave,
          onClick: onClick
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }

      var _props4 = this.props;
      var style = _props4.style;
      var children = _props4.children;
      var className = _props4.className;
      var width = _props4.width;
      var height = _props4.height;

      var others = _objectWithoutProperties(_props4, ['style', 'children', 'className', 'width', 'height']);

      var items = (0, _ReactUtils.findAllByType)(children, _Pie2.default);
      var attrs = (0, _ReactUtils.getPresentationAttributes)(others);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('recharts-wrapper', className),
          style: _extends({}, style, { position: 'relative', cursor: 'default', width: width, height: height })
        },
        _react2.default.createElement(
          _Surface2.default,
          _extends({}, attrs, { width: width, height: height }),
          this.renderItems(items),
          (0, _ReactUtils.filterSvgElements)(children)
        ),
        this.renderLegend(items),
        this.renderTooltip()
      );
    }
  }]);

  return PieChart;
}(_react.Component), _class2.displayName = 'PieChart', _class2.propTypes = {
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  }),
  title: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  className: _react.PropTypes.string,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onClick: _react.PropTypes.func
}, _class2.defaultProps = {
  style: {},
  margin: { top: 0, right: 0, bottom: 0, left: 0 }
}, _temp2)) || _class;

exports.default = PieChart;