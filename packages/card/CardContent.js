import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

const CardContent = ({ action, children, ...otherProps }) => {
  if (action) {
    return (
      <CardPrimaryAction action {...otherProps}>
        {children}
      </CardPrimaryAction>
    );
  }

  return <CardContentDefault {...otherProps}>{children}</CardContentDefault>;
};

class CardContentDefault extends React.Component {
  get classes() {
    const { action, className } = this.props;
    return classnames('bmc-card__content', className, {
      'mdc-card__primary-action': action
    });
  }

  initCardContent = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    initRipple(instance);
  };

  render() {
    const {
      action,
      children,
      className,
      initRipple,
      unbounded,
      ...otherProps
    } = this.props;

    return (
      <div className={this.classes} ref={this.initCardContent} {...otherProps}>
        {children}
      </div>
    );
  }
}

const CardPrimaryAction = withRipple(CardContentDefault);

CardContent.propTypes = {
  action: PropTypes.bool,
  children: PropTypes.node
};

CardContent.defaultProps = {
  action: false,
  children: null
};

CardContentDefault.propTypes = {
  action: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool
};

CardContentDefault.defaultProps = {
  action: false,
  children: null,
  className: null,
  initRipple: () => {},
  unbounded: false
};

export default CardContent;
