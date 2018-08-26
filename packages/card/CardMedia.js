import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardMedia = props => {
  const {
    children,
    className,
    imageUrl,
    square,
    style,
    wide,
    ...otherProps
  } = props;
  
  const classes = classnames('mdc-card__media', className, {
    'mdc-card__media--square': square,
    'mdc-card__media--16-9': wide
  });

  const getMergedStyles = () => {
    return {
      backgroundImage: imageUrl ? `url(${imageUrl})` : null,
      ...style
    };
  };

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
  style: PropTypes.object,
  wide: PropTypes.bool
};

CardMedia.defaulProps = {
  children: null,
  className: null,
  imageUrl: null,
  square: PropTypes.bool,
  style: PropTypes.object,
  wide: PropTypes.bool
};

export default CardMedia;
