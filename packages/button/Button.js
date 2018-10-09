import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

export class Button extends Component {
  get classes() {
    const { className, dense, outlined, raised, unelevated } = this.props;
    return classnames('mdc-button', className, {
      'mdc-button--dense': dense,
      'mdc-button--outlined': outlined,
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated
    });
  }

  addClassesToElement = (classes, element) => {
    const propsWithClasses = {
      className: classnames(classes, element.props.className)
    };
    return React.cloneElement(element, propsWithClasses);
  };

  initButton = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    initRipple(instance);
  };

  renderIcon() {
    const { icon } = this.props;
    if (!icon) return null;
    return this.addClassesToElement('mdc-button__icon', icon);
  }

  render() {
    const {
      children,
      className,
      dense,
      href,
      icon,
      initRipple,
      outlined,
      raised,
      unbounded, // eslint-disable-line no-unused-vars
      unelevated,
      ...otherProps
    } = this.props;

    const SemanticButton = href ? 'a' : 'button';

    return (
      <SemanticButton
        className={this.classes}
        href={href}
        ref={this.initButton}
        {...otherProps}
      >
        {this.renderIcon()}
        {children}
      </SemanticButton>
    );
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
