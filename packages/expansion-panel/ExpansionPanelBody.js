import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ExpansionPanelBody = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-expansion-panel__body', className);
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

ExpansionPanelBody.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};

ExpansionPanelBody.defaultProps = {
  children: null,
  className: null
};

export default ExpansionPanelBody;
