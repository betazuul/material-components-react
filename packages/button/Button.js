import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '../ripple';

export class Button extends Component {
  addClassesToElement(classes, element) {
    const propsWithClasses = {
      className: classnames(classes, element.props.className)
    };
    return React.cloneElement(element, propsWithClasses);
  }
  
  render() {
    const {
      children,
      className,
      dense,
      icon,
      initRipple,
      outlined,
      raised,
      unbounded, // eslint-disable-line no-unused-vars
      unelevated,
      ...otherProps
    } = this.props;

    const classes = classnames('mdc-button', className, {
      'mdc-button--dense': dense,
      'mdc-button--outlined': outlined,
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated
    });

    const SemanticButton = this.props.href ? 'a' : 'button';

    return (
      <SemanticButton className={classes} ref={initRipple} {...otherProps}>
        {icon ? this.renderIcon() : null}
        {children}
      </SemanticButton>
    );
  }

  renderIcon() {
    const { icon } = this.props;
    return this.addClassesToElement('mdc-button__icon', icon);
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.element,
  initRipple: PropTypes.func,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  unbounded: PropTypes.bool,
  unelevated: PropTypes.bool
};

Button.defaultProps = {
  children: null,
  className: null,
  dense: false,
  disabled: false,
  href: null,
  icon: null,
  initRipple: () => {},
  outlined: false,
  raised: false,
  unbounded: false,
  unelevated: false
};

export default withRipple(Button);