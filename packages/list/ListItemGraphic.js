import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListItemGraphic = ({ children, className, ...otherProps }) => {
  const classes = classnames(
    'mdc-list-item__graphic',
    'material-icons',
    className
  );
  return (
    <span className={classes} {...otherProps}>
      {children}
    </span>
  );
};

ListItemGraphic.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListItemGraphic.defaultProps = {
  children: null,
  className: null
};

export default ListItemGraphic;
