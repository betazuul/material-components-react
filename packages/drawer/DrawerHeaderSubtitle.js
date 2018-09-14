import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerHeaderSubtitle = ({ children, className }) => {
  const classes = classnames('mdc-drawer__subtitle', className);
  return <h6 className={classes}>{children}</h6>;
};

DrawerHeaderSubtitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

DrawerHeaderSubtitle.defaultProps = {
  children: null,
  className: null
};

export default DrawerHeaderSubtitle;
