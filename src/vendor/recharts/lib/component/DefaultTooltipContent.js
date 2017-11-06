'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Default Tooltip Content
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultTooltipContent = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(DefaultTooltipContent, _Component);

  function DefaultTooltipContent() {
    _classCallCheck(this, DefaultTooltipContent);

    return _possibleConstructorReturn(this, (DefaultTooltipContent.__proto__ || Object.getPrototypeOf(DefaultTooltipContent)).apply(this, arguments));
  }

  _createClass(DefaultTooltipContent, [{
    key: 'renderContent',
    value: function renderContent() {
      var _props = this.props;
      var payload = _props.payload;
      var separator = _props.separator;
      var formatter = _props.formatter;
      var itemStyle = _props.itemStyle;
      var itemSorter = _props.itemSorter;


      if (payload && payload.length) {
        var listStyle = { padding: 0, margin: 0 };

        var items = payload.filter(function (entry) {
          return (0, _isNumber3.default)(entry.value) || (0, _isString3.default)(entry.value);
        }).sort(itemSorter).map(function (entry, i) {
          var finalItemStyle = _extends({
            display: 'block',
            paddingTop: 4,
            paddingBottom: 4,
            color: entry.color || '#000'
          }, itemStyle);
          var finalFormatter = entry.formatter || formatter;

          return _react2.default.createElement(
            'li',
            { className: 'recharts-tooltip-item', key: 'tooltip-item-' + i, style: finalItemStyle },
            _react2.default.createElement(
              'span',
              { className: 'recharts-tooltip-item-name' },
              entry.name
            ),
            _react2.default.createElement(
              'span',
              { className: 'recharts-tooltip-item-separator' },
              separator
            ),
            _react2.default.createElement(
              'span',
              { className: 'recharts-tooltip-item-value' },
              finalFormatter ? finalFormatter(entry.value, entry.name, entry) : entry.value
            ),
            _react2.default.createElement(
              'span',
              { className: 'recharts-tooltip-item-unit' },
              entry.unit || ''
            )
          );
        });

        return _react2.default.createElement(
          'ul',
          { className: 'recharts-tooltip-item-list', style: listStyle },
          items
        );
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var labelStyle = _props2.labelStyle;
      var label = _props2.label;
      var labelFormatter = _props2.labelFormatter;
      var wrapperStyle = _props2.wrapperStyle;

      var finalStyle = _extends({
        margin: 0,
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        whiteSpace: 'nowrap'
      }, wrapperStyle);
      var finalLabelStyle = _extends({
        margin: 0
      }, labelStyle);
      var hasLabel = (0, _isNumber3.default)(label) || (0, _isString3.default)(label);
      var finalLabel = hasLabel ? label : '';

      if (hasLabel && labelFormatter) {
        finalLabel = labelFormatter(label);
      }

      return _react2.default.createElement(
        'div',
        { className: 'recharts-default-tooltip', style: finalStyle },
        _react2.default.createElement(
          'p',
          { className: 'recharts-tooltip-label', style: finalLabelStyle },
          finalLabel
        ),
        this.renderContent()
      );
    }
  }]);

  return DefaultTooltipContent;
}(_react.Component), _class2.displayName = 'DefaultTooltipContent', _class2.propTypes = {
  separator: _react.PropTypes.string,
  formatter: _react.PropTypes.func,
  wrapperStyle: _react.PropTypes.object,
  itemStyle: _react.PropTypes.object,
  labelStyle: _react.PropTypes.object,
  labelFormatter: _react.PropTypes.func,
  label: _react.PropTypes.any,
  payload: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.any,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    unit: _react.PropTypes.any
  })),
  itemSorter: _react.PropTypes.func
}, _class2.defaultProps = {
  separator: ' : ',
  itemStyle: {},
  labelStyle: {}
}, _temp)) || _class;

exports.default = DefaultTooltipContent;