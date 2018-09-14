import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardActionButtons = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-card__action-buttons', className);

  const renderButtons = () =>
    React.Children.map(children, child => {
      const { className: childClassName, ...otherChildProps } = child.props;
      const childClasses = classnames(
        className,
        'mdc-card__action',
        'mdc-card__action--button'
      );

      const childProps = {
        childClasses,
        ...otherChildProps
      };

      return React.cloneElement(child, childProps);
    });

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

CardActionButtons.defaultProps = {
  children: null,
  className: null
};

export default CardActionButtons;
