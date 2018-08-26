import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Card = props => {
  const { children, className, outlined, ...otherProps } = props;
  const classes = classnames('mdc-card', className, {
    'mdc-card--outlined': outlined
  });
  
  return <div className={classes} {...otherProps}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  outlined: PropTypes.bool
};

Card.defaulProps = {
  children: null,
  className: null,
  outlined: false
};

export default Card;
