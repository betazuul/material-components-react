import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardActionIcons = props => {
  const { children, className, ...otherProps } = props;
  const classes = classnames('mdc-card__action-icons', className);

  const renderIcons = () => {
    return React.Children.map(children, child => {
      const { className, ...otherChildProps } = child.props;
      const childClassName = classnames(
        className,
        'mdc-card__action',
        'mdc-card__action--icon'
      );
      
      const childProps = {
        childClassName,
        ...otherChildProps
      };

      return React.cloneElement(child, childProps);
    });
  };

  return (
    <div className={classes} {...otherProps}>
      {renderIcons()}
    </div>
  );
};

CardActionIcons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

CardActionIcons.defaulProps = {
  children: null,
  className: null
};

export default CardActionIcons;
