import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListGroup = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-list-group', className);
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
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
