import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardMediaContent = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-card__media-content', className);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

CardMediaContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

CardMediaContent.defaultProps = {
  children: null,
  className: null
};

export default CardMediaContent;
