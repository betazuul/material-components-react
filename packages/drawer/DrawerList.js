import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerList = ({ children, className }) => {
  const classes = classnames('mdc-list', className);
  return <nav className={classes}>{children}</nav>;
};

DrawerList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DrawerList.defaultProps = {
  children: null,
  className: null,
};

export default DrawerList;
