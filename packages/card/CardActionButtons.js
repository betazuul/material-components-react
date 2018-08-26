import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardActionButtons = props => {
  const { children, className, ...otherProps } = props;
  const classes = classnames('mdc-card__action-buttons', className);
  
  const renderButtons = () => {
    return React.Children.map(children, child => {
      const { className, ...otherChildProps } = child.props;
      const childClassName = classnames(
        className,
        'mdc-card__action',
        'mdc-card__action--button'
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
      {renderButtons()}
    </div>
  );
};

CardActionButtons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

CardActionButtons.defaulProps = {
  children: null,
  className: null
};

export default CardActionButtons;
