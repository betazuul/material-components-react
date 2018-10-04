import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListGroup = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-list-group__subheader', className);
  return (
    <h3 className={classes} {...otherProps}>
      {children}
    </h3>
  );
};

ListGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListGroup.defaultProps = {
  children: null,
  className: null
};

export default ListGroup;
