import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ExpansionPanelIcon = ({
  children,
  className,
  details,
  noClick,
  summary,
  ...otherProps
}) => {
  const classes = classnames('mdc-expansion-panel__icon', 'material-icons', className, {
    'mdc-expansion-panel--details': details,
    'mdc-expansion-panel--no-click': noClick,
    'mdc-expansion-panel--summary': summary
  });
  return (
    <i className={classes} {...otherProps}>
      {children}
    </i>
  );
};

ExpansionPanelIcon.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  details: PropTypes.bool,
  noClick: PropTypes.bool,
  summary: PropTypes.bool
};

ExpansionPanelIcon.defaultProps = {
  children: null,
  className: null,
  details: false,
  noClick: false,
  summary: false
};

export default ExpansionPanelIcon;
