import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardMediaContent = props => {
  const { children, className, ...otherProps } = props;
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

CardMediaContent.defaulProps = {
  children: null,
  className: null
};

export default CardMediaContent;
