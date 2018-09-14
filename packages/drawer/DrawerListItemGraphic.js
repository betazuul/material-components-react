import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerListItemGraphic = ({ icon, className, children }) => {
  const classes = classnames('mdc-list-item__graphic', className, {
    'material-icons': icon
  });
  return (
    <span className={classes} aria-hidden="true">
      {children}
    </span>
  );
};

DrawerListItemGraphic.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.bool
};

DrawerListItemGraphic.defaultProps = {
  children: null,
  className: null,
  icon: false
};

export default DrawerListItemGraphic;
