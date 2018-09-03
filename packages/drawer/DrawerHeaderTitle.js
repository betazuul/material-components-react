import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerHeaderTitle = ({ children, className }) => {
  const classes = classnames('mdc-drawer__title', className);
  return <h3 className={classes}>{children}</h3>;
};

DrawerHeaderTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DrawerHeaderTitle.defaultProps = {
  children: null,
  className: null,
};

export default DrawerHeaderTitle;
