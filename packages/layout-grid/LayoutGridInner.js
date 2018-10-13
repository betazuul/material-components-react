import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LayoutGridInner = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-layout-grid__inner', className);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

LayoutGridInner.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

LayoutGridInner.defaultProps = {
  children: null,
  className: null
};

export default LayoutGridInner;
