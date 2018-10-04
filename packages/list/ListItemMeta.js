import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListItemMeta = ({ children, className, ...otherProps }) => {
  const classes = classnames(
    'mdc-list-item__meta',
    'material-icons',
    className
  );
  return (
    <span className={classes} {...otherProps}>
      {children}
    </span>
  );
};

ListItemMeta.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListItemMeta.defaultProps = {
  children: null,
  className: null
};

export default ListItemMeta;
