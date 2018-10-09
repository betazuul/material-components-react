import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DialogTitle = ({ children, className }) => {
  const classes = classnames('mdc-dialog__title', className);
  return (
    <h2 className={classes} id="my-dialog-title">
      {children}
    </h2>
  );
};

DialogTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

DialogTitle.defaultProps = {
  children: null,
  className: null
};

export default DialogTitle;
