import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LayoutGrid = ({ align, children, className, fixed, ...otherProps }) => {
  const classes = classnames('mdc-layout-grid', className, {
    [`mdc-layout-grid--align-${align}`]: align,
    'mdc-layout-grid--fixed-column-width': fixed
  });

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

LayoutGrid.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool
};

LayoutGrid.defaultProps = {
  align: null,
  children: null,
  className: null,
  fixed: null
};

export default LayoutGrid;
