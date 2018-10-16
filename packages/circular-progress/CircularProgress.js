import React from 'react';
import PropTypes from 'prop-types';

const CircularProgress = ({ color, size, style }) => {
  const styleSize = size || 100;
  return (
    <svg
      className="bmc-circular-progress"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
      style={{ height: `${styleSize}px`, width: `${styleSize}px`, ...style }}
    >
      <circle
        className="bmc-circular-progress__circle"
        cx="50%"
        cy="50%"
        r="45"
        style={{
          animationName: 'stroke-rotate-100',
          strokeDasharray: '282.743px',
          strokeWidth: '10%',
          stroke: `${color}`
        }}
      />
    </svg>
  );
};

CircularProgress.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any)
};

CircularProgress.defaultProps = {
  color: null,
  size: null,
  style: null
};

export default CircularProgress;
