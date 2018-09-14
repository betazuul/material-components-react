import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardMedia = ({
  children,
  className,
  imageUrl,
  square,
  style,
  wide,
  ...otherProps
}) => {
  const classes = classnames('mdc-card__media', className, {
    'mdc-card__media--square': square,
    'mdc-card__media--16-9': wide
  });

  const getMergedStyles = () => ({
    backgroundImage: imageUrl ? `url(${imageUrl})` : null,
    ...style
  });

  return (
    <div className={classes} style={getMergedStyles()} {...otherProps}>
      {children}
    </div>
  );
};

CardMedia.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  square: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
  wide: PropTypes.bool
};

CardMedia.defaultProps = {
  children: null,
  className: null,
  imageUrl: null,
  square: false,
  style: null,
  wide: false
};

export default CardMedia;
