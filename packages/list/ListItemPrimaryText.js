import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListItemPrimaryText = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-list-item__primary-text', className);
  return (
    <span className={classes} {...otherProps}>
      {children}
    </span>
  );
};

ListItemPrimaryText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListItemPrimaryText.defaultProps = {
  children: null,
  className: null
};

export default ListItemPrimaryText;
