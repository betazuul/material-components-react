import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CardActionIcons = ({ children, className, ...otherProps }) => {
  const classes = classnames('mdc-card__action-icons', className);

  const renderIcons = () =>
    React.Children.map(children, child => {
      const { className: childClassName, ...otherChildProps } = child.props;
      const childClasses = classnames(
        className,
        'mdc-card__action',
        'mdc-card__action--icon'
      );

      const childProps = {
        className: childClasses,
        ...otherChildProps
      };

      return React.cloneElement(child, childProps);
    });

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

CardActionIcons.defaultProps = {
  children: null,
  className: null
};

export default CardActionIcons;
