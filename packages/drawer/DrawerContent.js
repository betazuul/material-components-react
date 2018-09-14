import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerContent = ({ children, className }) => {
  const classes = classnames('mdc-drawer__content', className); // 'mdc-list-group,'
  return <nav className={classes}>{children}</nav>;
};

DrawerContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

DrawerContent.defaultProps = {
  children: null,
  className: null
};

export default DrawerContent;
