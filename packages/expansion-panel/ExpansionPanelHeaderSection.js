import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ExpansionPanelHeaderSection = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-expansion-panel__header__section', className);
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

ExpansionPanelHeaderSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ExpansionPanelHeaderSection.defaultProps = {
  children: null,
  className: null
};

export default ExpansionPanelHeaderSection;
