import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardActions = ({ children, className, full, ...otherProps }) => {
  const classes = classnames('mdc-card__actions', className, {
    'mdc-card__actions--full-bleed': full
  });

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

CardActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  full: PropTypes.bool
};

CardActions.defaultProps = {
  children: null,
  className: null,
  full: false
};

export default CardActions;
