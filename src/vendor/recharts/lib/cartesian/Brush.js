'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Brush
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _d3Scale = require('d3-scale');

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Text = require('../component/Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Brush = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Brush, _Component);

  function Brush(props) {
    _classCallCheck(this, Brush);

    var _this = _possibleConstructorReturn(this, (Brush.__proto__ || Object.getPrototypeOf(Brush)).call(this, props));

    _this.handleMove = function (e) {
      if (_this.leaveTimer) {
        clearTimeout(_this.leaveTimer);
        _this.leaveTimer = null;
      }

      if (_this.state.isTravellerMoving) {
        _this.handleTravellerMove(e);
      } else if (_this.state.isSlideMoving) {
        _this.handleSlideMove(e);
      }
    };

    _this.handleUp = function () {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: false
      });
    };

    _this.handleLeaveWrapper = function () {
      if (_this.state.isTravellerMoving || _this.state.isSlideMoving) {
        _this.leaveTimer = setTimeout(_this.handleUp, 1000);
      }
    };

    _this.handleEnterSlideOrTraveller = function () {
      _this.setState({
        isTextActive: true
      });
    };

    _this.handleLeaveSlideOrTraveller = function () {
      _this.setState({
        isTextActive: false
      });
    };

    _this.handleSlideDown = function (e) {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: true,
        slideMoveStartX: e.pageX
      });
    };

    _this.travellerDownHandlers = {
      startX: _this.handleTravellerDown.bind(_this, 'startX'),
      endX: _this.handleTravellerDown.bind(_this, 'endX')
    };

    if (props.data && props.data.length) {
      _this.updateScale(props);
    } else {
      _this.state = {};
    }
    return _this;
  }

  _createClass(Brush, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var _props = this.props;
      var data = _props.data;
      var width = _props.width;
      var x = _props.x;
      var travellerWidth = _props.travellerWidth;


      if (nextProps.data !== data) {
        this.updateScale(nextProps);
      } else if (nextProps.width !== width || nextProps.x !== x || nextProps.travellerWidth !== travellerWidth) {
        this.scale.range([nextProps.x, nextProps.x + nextProps.width - nextProps.travellerWidth]);
        this.scaleValues = this.scale.domain().map(function (entry) {
          return _this2.scale(entry);
        });

        this.setState({
          startX: this.scale(nextProps.startIndex),
          endX: this.scale(nextProps.endIndex)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.scale = null;
      this.scaleValues = null;

      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    }
  }, {
    key: 'getIndexInRange',
    value: function getIndexInRange(range, x) {
      var len = range.length;
      var start = 0;
      var end = len - 1;

      while (end - start > 1) {
        var middle = Math.floor((start + end) / 2);

        if (range[middle] > x) {
          end = middle;
        } else {
          start = middle;
        }
      }

      return x >= range[end] ? end : start;
    }
  }, {
    key: 'getIndex',
    value: function getIndex(_ref) {
      var startX = _ref.startX;
      var endX = _ref.endX;

      var min = Math.min(startX, endX);
      var max = Math.max(startX, endX);
      var minIndex = this.getIndexInRange(this.scaleValues, min);
      var maxIndex = this.getIndexInRange(this.scaleValues, max);

      return {
        startIndex: minIndex,
        endIndex: maxIndex
      };
    }
  }, {
    key: 'getTextOfTick',
    value: function getTextOfTick(index) {
      var _props2 = this.props;
      var data = _props2.data;
      var tickFormatter = _props2.tickFormatter;
      var dataKey = _props2.dataKey;

      var text = data[index] && dataKey ? data[index][dataKey] : index;

      return (0, _isFunction3.default)(tickFormatter) ? tickFormatter(text) : text;
    }
  }, {
    key: 'handleSlideMove',
    value: function handleSlideMove(e) {
      var _state = this.state;
      var slideMoveStartX = _state.slideMoveStartX;
      var startX = _state.startX;
      var endX = _state.endX;
      var _props3 = this.props;
      var x = _props3.x;
      var width = _props3.width;
      var travellerWidth = _props3.travellerWidth;
      var onChange = _props3.onChange;

      var delta = e.pageX - slideMoveStartX;

      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
      } else if (delta < 0) {
        delta = Math.max(delta, x - startX, x - endX);
      }
      var newIndex = this.getIndex({
        startX: startX + delta,
        endX: endX + delta
      });

      this.setState({
        startX: startX + delta,
        endX: endX + delta,
        slideMoveStartX: e.pageX
      }, function () {
        if (onChange) {
          onChange(newIndex);
        }
      });
    }
  }, {
    key: 'handleTravellerDown',
    value: function handleTravellerDown(id, e) {
      this.setState({
        isSlideMoving: false,
        isTravellerMoving: true,
        movingTravellerId: id,
        brushMoveStartX: e.pageX
      });
    }
  }, {
    key: 'handleTravellerMove',
    value: function handleTravellerMove(e) {
      var _setState;

      var _state2 = this.state;
      var brushMoveStartX = _state2.brushMoveStartX;
      var movingTravellerId = _state2.movingTravellerId;

      var prevValue = this.state[movingTravellerId];
      var _props4 = this.props;
      var x = _props4.x;
      var width = _props4.width;
      var travellerWidth = _props4.travellerWidth;
      var onChange = _props4.onChange;


      var params = { startX: this.state.startX, endX: this.state.endX };
      var delta = e.pageX - brushMoveStartX;

      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - prevValue);
      } else if (delta < 0) {
        delta = Math.max(delta, x - prevValue);
      }

      params[movingTravellerId] = prevValue + delta;
      var newIndex = this.getIndex(params);

      this.setState((_setState = {}, _defineProperty(_setState, movingTravellerId, prevValue + delta), _defineProperty(_setState, 'brushMoveStartX', e.pageX), _setState), function () {
        if (onChange) {
          onChange(newIndex);
        }
      });
    }
  }, {
    key: 'updateScale',
    value: function updateScale(props) {
      var _this3 = this;

      var data = props.data;
      var startIndex = props.startIndex;
      var endIndex = props.endIndex;
      var x = props.x;
      var width = props.width;
      var travellerWidth = props.travellerWidth;


      if (data && data.length) {
        var len = data.length;
        this.scale = (0, _d3Scale.scalePoint)().domain((0, _range3.default)(0, len)).range([x, x + width - travellerWidth]);
        this.scaleValues = this.scale.domain().map(function (entry) {
          return _this3.scale(entry);
        });
        this.state = {
          isTextActive: false,
          isSlideMoving: false,
          isTravellerMoving: false,
          startX: this.scale(startIndex),
          endX: this.scale(endIndex)
        };
      }
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground() {
      var _props5 = this.props;
      var x = _props5.x;
      var y = _props5.y;
      var width = _props5.width;
      var height = _props5.height;
      var fill = _props5.fill;
      var stroke = _props5.stroke;


      return _react2.default.createElement('rect', {
        stroke: stroke,
        fill: fill,
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  }, {
    key: 'renderTraveller',
    value: function renderTraveller(startX, id) {
      var _props6 = this.props;
      var y = _props6.y;
      var travellerWidth = _props6.travellerWidth;
      var height = _props6.height;
      var stroke = _props6.stroke;

      var lineY = Math.floor(y + height / 2) - 1;
      var x = Math.max(startX, this.props.x);

      return _react2.default.createElement(
        _Layer2.default,
        {
          className: 'recharts-brush-traveller',
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.travellerDownHandlers[id],
          style: { cursor: 'col-resize' }
        },
        _react2.default.createElement('rect', {
          x: x,
          y: y,
          width: travellerWidth,
          height: height,
          fill: stroke,
          stroke: 'none'
        }),
        _react2.default.createElement('line', {
          x1: x + 1,
          y1: lineY,
          x2: x + travellerWidth - 1,
          y2: lineY,
          fill: 'none',
          stroke: '#fff'
        }),
        _react2.default.createElement('line', {
          x1: x + 1,
          y1: lineY + 2,
          x2: x + travellerWidth - 1,
          y2: lineY + 2,
          fill: 'none',
          stroke: '#fff'
        })
      );
    }
  }, {
    key: 'renderSlide',
    value: function renderSlide(startX, endX) {
      var _props7 = this.props;
      var y = _props7.y;
      var height = _props7.height;
      var stroke = _props7.stroke;


      return _react2.default.createElement('rect', {
        className: 'recharts-brush-slide',
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDown,
        style: { cursor: 'move' },
        stroke: 'none',
        fill: stroke,
        fillOpacity: 0.2,
        x: Math.min(startX, endX),
        y: y,
        width: Math.abs(endX - startX),
        height: height
      });
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      var _props8 = this.props;
      var startIndex = _props8.startIndex;
      var endIndex = _props8.endIndex;
      var data = _props8.data;
      var y = _props8.y;
      var height = _props8.height;
      var travellerWidth = _props8.travellerWidth;
      var stroke = _props8.stroke;
      var tickFormatter = _props8.tickFormatter;
      var _state3 = this.state;
      var startX = _state3.startX;
      var endX = _state3.endX;

      var offset = 5;
      var style = {
        pointerEvents: 'none',
        fill: stroke
      };

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-brush-texts' },
        _react2.default.createElement(
          _Text2.default,
          {
            textAnchor: 'end',
            verticalAnchor: 'middle',
            style: style,
            x: Math.min(startX, endX) - offset,
            y: y + height / 2
          },
          this.getTextOfTick(startIndex)
        ),
        _react2.default.createElement(
          _Text2.default,
          {
            textAnchor: 'start',
            verticalAnchor: 'middle',
            style: style,
            x: Math.max(startX, endX) + travellerWidth + offset,
            y: y + height / 2
          },
          this.getTextOfTick(endIndex)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props9 = this.props;
      var x = _props9.x;
      var width = _props9.width;
      var travellerWidth = _props9.travellerWidth;
      var data = _props9.data;
      var className = _props9.className;
      var _state4 = this.state;
      var startX = _state4.startX;
      var endX = _state4.endX;
      var isTextActive = _state4.isTextActive;
      var isSlideMoving = _state4.isSlideMoving;
      var isTravellerMoving = _state4.isTravellerMoving;


      if (!data || !data.length) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-brush', className);

      return _react2.default.createElement(
        _Layer2.default,
        {
          className: layerClass,
          onMouseUp: this.handleUp,
          onMouseMove: this.handleMove,
          onMouseLeave: this.handleLeaveWrapper
        },
        this.renderBackground(),
        this.renderSlide(startX, endX),
        this.renderTraveller(startX, 'startX'),
        this.renderTraveller(endX, 'endX'),
        (isTextActive || isSlideMoving || isTravellerMoving) && this.renderText()
      );
    }
  }]);

  return Brush;
}(_react.Component), _class2.displayName = 'Brush', _class2.propTypes = {
  className: _react.PropTypes.string,

  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string,
  x: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  travellerWidth: _react.PropTypes.number,

  dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  data: _react.PropTypes.array,
  startIndex: _react.PropTypes.number,
  endIndex: _react.PropTypes.number,
  tickFormatter: _react.PropTypes.func,

  onChange: _react.PropTypes.func
}, _class2.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 40,
  travellerWidth: 5,
  fill: '#fff',
  stroke: '#666'
}, _temp)) || _class;

exports.default = Brush;