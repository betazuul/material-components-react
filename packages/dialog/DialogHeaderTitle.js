import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DialogHeaderTitle = ({ children, className }) => {
  const classes = classnames('mdc-dialog__header__title', className);
  return <h2 className={classes}>{children}</h2>;
};

DialogHeaderTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DialogHeaderTitle.defaultProps = {
  children: null,
  className: null,
};

export default DialogHeaderTitle;
