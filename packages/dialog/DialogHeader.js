import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DialogHeader = ({ children, className }) => {
  const classes = classnames('mdc-dialog__header', className);
  return <header className={classes}>{children}</header>;
};

DialogHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

DialogHeader.defaultProps = {
  children: null,
  className: null
};

export default DialogHeader;
