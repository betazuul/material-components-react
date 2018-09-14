import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerHeader = ({ children, className }) => {
  const classes = classnames('mdc-drawer__header', className);
  return <header className={classes}>{children}</header>;
};

DrawerHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

DrawerHeader.defaultProps = {
  children: null,
  className: null
};

export default DrawerHeader;
