import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListItemText = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-list-item__text', className);
  return (
    <span className={classes} {...otherProps}>
      {children}
    </span>
  );
};

ListItemText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListItemText.defaultProps = {
  children: null,
  className: null
};

export default ListItemText;
