/**
 * @fileOverview Brush
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { scalePoint } from 'd3-scale';
import pureRender from '../util/PureRender';
import Layer from '../container/Layer';
import Text from '../component/Text';
import _ from 'lodash';

@pureRender
class Brush extends Component {

  static displayName = 'Brush';

  static propTypes = {
    className: PropTypes.string,

    fill: PropTypes.string,
    stroke: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    travellerWidth: PropTypes.number,

    dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.array,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
    tickFormatter: PropTypes.func,

    onChange: PropTypes.func,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 40,
    travellerWidth: 5,
    fill: '#fff',
    stroke: '#666',
  };

  constructor(props) {
    super(props);

    this.travellerDownHandlers = {
      startX: this.handleTravellerDown.bind(this, 'startX'),
      endX: this.handleTravellerDown.bind(this, 'endX'),
    };

    if (props.data && props.data.length) {
      this.updateScale(props);
    } else {
      this.state = {};
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, width, x, travellerWidth } = this.props;

    if (nextProps.data !== data) {
      this.updateScale(nextProps);
    } else if (nextProps.width !== width || nextProps.x !== x ||
      nextProps.travellerWidth !== travellerWidth) {
      this.scale.range([nextProps.x, nextProps.x + nextProps.width - nextProps.travellerWidth]);
      this.scaleValues = this.scale.domain().map(entry => this.scale(entry));

      this.setState({
        startX: this.scale(nextProps.startIndex),
        endX: this.scale(nextProps.endIndex),
      });
    }
  }

  componentWillUnmount() {
    this.scale = null;
    this.scaleValues = null;

    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }
  }

  getIndexInRange(range, x) {
    const len = range.length;
    let start = 0;
    let end = len - 1;

    while (end - start > 1) {
      const middle = Math.floor((start + end) / 2);

      if (range[middle] > x) {
        end = middle;
      } else {
        start = middle;
      }
    }

    return x >= range[end] ? end : start;
  }

  getIndex({ startX, endX }) {
    const min = Math.min(startX, endX);
    const max = Math.max(startX, endX);
    const minIndex = this.getIndexInRange(this.scaleValues, min);
    const maxIndex = this.getIndexInRange(this.scaleValues, max);

    return {
      startIndex: minIndex,
      endIndex: maxIndex,
    };
  }

  getTextOfTick(index) {
    const { data, tickFormatter, dataKey } = this.props;
    const text = (data[index] && dataKey) ? data[index][dataKey] : index;

    return _.isFunction(tickFormatter) ? tickFormatter(text) : text;
  }

  handleMove = (e) => {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }

    if (this.state.isTravellerMoving) {
      this.handleTravellerMove(e);
    } else if (this.state.isSlideMoving) {
      this.handleSlideMove(e);
    }
  };

  handleUp = () => {
    this.setState({
      isTravellerMoving: false,
      isSlideMoving: false,
    });
  };

  handleLeaveWrapper = () => {
    if (this.state.isTravellerMoving || this.state.isSlideMoving) {
      this.leaveTimer = setTimeout(this.handleUp, 1000);
    }
  };

  handleEnterSlideOrTraveller = () => {
    this.setState({
      isTextActive: true,
    });
  };

  handleLeaveSlideOrTraveller = () => {
    this.setState({
      isTextActive: false,
    });
  };

  handleSlideDown = (e) => {
    this.setState({
      isTravellerMoving: false,
      isSlideMoving: true,
      slideMoveStartX: e.pageX,
    });
  };

  handleSlideMove(e) {
    const { slideMoveStartX, startX, endX } = this.state;
    const { x, width, travellerWidth, onChange } = this.props;
    let delta = e.pageX - slideMoveStartX;

    if (delta > 0) {
      delta = Math.min(
        delta,
        x + width - travellerWidth - endX,
        x + width - travellerWidth - startX
      );
    } else if (delta < 0) {
      delta = Math.max(delta, x - startX, x - endX);
    }
    const newIndex = this.getIndex({
      startX: startX + delta,
      endX: endX + delta,
    });

    this.setState({
      startX: startX + delta,
      endX: endX + delta,
      slideMoveStartX: e.pageX,
    }, () => {
      if (onChange) {
        onChange(newIndex);
      }
    });
  }

  handleTravellerDown(id, e) {
    this.setState({
      isSlideMoving: false,
      isTravellerMoving: true,
      movingTravellerId: id,
      brushMoveStartX: e.pageX,
    });
  }

  handleTravellerMove(e) {
    const { brushMoveStartX, movingTravellerId } = this.state;
    const prevValue = this.state[movingTravellerId];
    const { x, width, travellerWidth, onChange } = this.props;

    const params = { startX: this.state.startX, endX: this.state.endX };
    let delta = e.pageX - brushMoveStartX;

    if (delta > 0) {
      delta = Math.min(delta, x + width - travellerWidth - prevValue);
    } else if (delta < 0) {
      delta = Math.max(delta, x - prevValue);
    }

    params[movingTravellerId] = prevValue + delta;
    const newIndex = this.getIndex(params);

    this.setState({
      [movingTravellerId]: prevValue + delta,
      brushMoveStartX: e.pageX,
    }, () => {
      if (onChange) {
        onChange(newIndex);
      }
    });
  }

  updateScale(props) {
    const { data, startIndex, endIndex, x, width, travellerWidth } = props;

    if (data && data.length) {
      const len = data.length;
      this.scale = scalePoint().domain(_.range(0, len))
                    .range([x, x + width - travellerWidth]);
      this.scaleValues = this.scale.domain().map(entry => this.scale(entry));
      this.state = {
        isTextActive: false,
        isSlideMoving: false,
        isTravellerMoving: false,
        startX: this.scale(startIndex),
        endX: this.scale(endIndex),
      };
    }
  }

  renderBackground() {
    const { x, y, width, height, fill, stroke } = this.props;

    return (
      <rect
        stroke={stroke}
        fill={fill}
        x={x}
        y={y}
        width={width}
        height={height}
      />
    );
  }

  renderTraveller(startX, id) {
    const { y, travellerWidth, height, stroke } = this.props;
    const lineY = Math.floor(y + height / 2) - 1;
    const x = Math.max(startX, this.props.x);

    return (
      <Layer
        className="recharts-brush-traveller"
        onMouseEnter={this.handleEnterSlideOrTraveller}
        onMouseLeave={this.handleLeaveSlideOrTraveller}
        onMouseDown={this.travellerDownHandlers[id]}
        style={{ cursor: 'col-resize' }}
      >
        <rect
          x={x}
          y={y}
          width={travellerWidth}
          height={height}
          fill={stroke}
          stroke="none"
        />
        <line
          x1={x + 1}
          y1={lineY}
          x2={x + travellerWidth - 1}
          y2={lineY}
          fill="none"
          stroke="#fff"
        />
        <line
          x1={x + 1}
          y1={lineY + 2}
          x2={x + travellerWidth - 1}
          y2={lineY + 2}
          fill="none"
          stroke="#fff"
        />
      </Layer>
    );
  }

  renderSlide(startX, endX) {
    const { y, height, stroke } = this.props;

    return (
      <rect
        className="recharts-brush-slide"
        onMouseEnter={this.handleEnterSlideOrTraveller}
        onMouseLeave={this.handleLeaveSlideOrTraveller}
        onMouseDown={this.handleSlideDown}
        style={{ cursor: 'move' }}
        stroke="none"
        fill={stroke}
        fillOpacity={0.2}
        x={Math.min(startX, endX)}
        y={y}
        width={Math.abs(endX - startX)}
        height={height}
      />
    );
  }

  renderText() {
    const { startIndex, endIndex, data, y, height, travellerWidth,
      stroke, tickFormatter } = this.props;
    const { startX, endX } = this.state;
    const offset = 5;
    const style = {
      pointerEvents: 'none',
      fill: stroke,
    };

    return (
      <Layer className="recharts-brush-texts">
        <Text
          textAnchor="end"
          verticalAnchor="middle"
          style={style}
          x={Math.min(startX, endX) - offset}
          y={y + height / 2}
        >
          {this.getTextOfTick(startIndex)}
        </Text>
        <Text
          textAnchor="start"
          verticalAnchor="middle"
          style={style}
          x={Math.max(startX, endX) + travellerWidth + offset}
          y={y + height / 2}
        >
          {this.getTextOfTick(endIndex)}
        </Text>
      </Layer>
    );
  }

  render() {
    const { x, width, travellerWidth, data, className } = this.props;
    const { startX, endX, isTextActive, isSlideMoving, isTravellerMoving } = this.state;

    if (!data || !data.length) { return null; }

    const layerClass = classNames('recharts-brush', className);

    return (
      <Layer
        className={layerClass}
        onMouseUp={this.handleUp}
        onMouseMove={this.handleMove}
        onMouseLeave={this.handleLeaveWrapper}
      >
        {this.renderBackground()}
        {this.renderSlide(startX, endX)}
        {this.renderTraveller(startX, 'startX')}
        {this.renderTraveller(endX, 'endX')}
        {(isTextActive || isSlideMoving || isTravellerMoving) && this.renderText()}
      </Layer>
    );
  }
}

export default Brush;
