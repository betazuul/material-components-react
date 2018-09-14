import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Shape = props => {
  const {
    children,
    className,
    topLeft,
    topRight,
    bottomRight,
    bottomLeft
  } = props;
  const classes = classnames('mdc-shape-container', className);

  const renderCorner = corner =>
    (topLeft && corner === 'top-left') ||
    (topRight && corner === 'top-right') ||
    (bottomRight && corner === 'bottom-right') ||
    (bottomLeft && corner === 'bottom-left') ? (
      <div
        className={classnames('mdc-shape-container__corner', {
          [`mdc-shape-container__corner--${corner}`]: corner
        })}
      />
    ) : null;

  return (
    <div className={classes}>
      {children}
      {renderCorner('top-left')}
      {renderCorner('top-right')}
      {renderCorner('bottom-right')}
      {renderCorner('bottom-left')}
    </div>
  );
};

Shape.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  topLeft: PropTypes.bool,
  topRight: PropTypes.bool,
  bottomRight: PropTypes.bool,
  bottomLeft: PropTypes.bool
};

Shape.defaultProps = {
  children: null,
  className: null,
  topLeft: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false
};

export default Shape;
