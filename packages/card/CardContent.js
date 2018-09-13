import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '../ripple';

const CardContent = (props) => {
  const { action, children, ...otherProps } = props;

  if (action) {
    return (
      <CardPrimaryAction action {...otherProps}>
        {children}
      </CardPrimaryAction>
    );
  }

  return <CardContentDefault {...otherProps}>{children}</CardContentDefault>;
};

const CardContentDefault = (props) => {
  const {
    action, children, className, initRipple, ...otherProps
  } = props;
  const classes = classnames('bmc-card__content', className, {
    'mdc-card__primary-action': action,
  });

  return (
    <div className={classes} ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
};

const CardPrimaryAction = withRipple(CardContentDefault);

CardContent.propTypes = {
  action: PropTypes.bool,
  children: PropTypes.node,
};

CardContent.defaultProps = {
  action: false,
  children: null,
};

CardContentDefault.propTypes = {
  action: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  initRipple: PropTypes.func,
};

CardContentDefault.defaultProps = {
  action: false,
  children: null,
  className: null,
  initRipple: () => {},
};

export default CardContent;
