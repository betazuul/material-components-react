import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListItemSecondaryText = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-list-item__secondary-text', className);
  return (
    <span className={classes} {...otherProps}>
      {children}
    </span>
  );
};

ListItemSecondaryText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListItemSecondaryText.defaultProps = {
  children: null,
  className: null
};

export default ListItemSecondaryText;
