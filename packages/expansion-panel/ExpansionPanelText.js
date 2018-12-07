import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ExpansionPanelText = ({
  children,
  className,
  details,
  noClick,
  summary,
  ...otherProps
}) => {
  const classes = classnames('mdc-expansion-panel__text', className, {
    'mdc-expansion-panel--details': details,
    'mdc-expansion-panel--no-click': noClick,
    'mdc-expansion-panel--summary': summary
  });
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

ExpansionPanelText.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  details: PropTypes.bool,
  noClick: PropTypes.bool,
  summary: PropTypes.bool
};

ExpansionPanelText.defaultProps = {
  children: null,
  className: null,
  details: false,
  noClick: false,
  summary: false
};

export default ExpansionPanelText;
