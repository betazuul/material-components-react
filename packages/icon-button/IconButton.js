import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCIconButtonToggleFoundation } from '@material/icon-button';
import { withRipple } from '@betazuul/ripple';

class IconButton extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.iconButtonEl = null;
    this.iconEl = null;
  }

  componentDidMount() {
    const { toggle, toggled } = this.props;

    this.foundation = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation.init();

    if (toggle && toggled) {
      this.foundation.toggle();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter() {
    const { onChange, toggleOnClass, toggleOffClass } = this.props;

    return {
      addClass: className => {
        this.iconEl.classList.add(className);
        // Hack to get around toggleOnClass not being removed by foundation
        if (className === toggleOffClass) {
          this.iconEl.classList.remove(toggleOnClass);
        }
      },
      removeClass: className => {
        this.iconEl.classList.remove(className);
        // Hack to get around toggleOnClass not being added by foundation
        if (className === toggleOffClass) {
          this.iconEl.classList.add(toggleOnClass);
        }
      },
      setText: text => (this.iconEl.textContent = text),
      getAttr: name => this.iconButtonEl.getAttribute(name),
      setAttr: (name, value) => this.iconButtonEl.setAttribute(name, value),
      notifyChange: event => {
        if (onChange) onChange(event);
      }
    };
  }

  get classes() {
    const { className, material } = this.props;

    return classnames('mdc-icon-button', className, {
      'material-icons': material,
      'non-material-icons': !material
    });
  }

  handleClick = () => {
    const { toggle } = this.props;

    if (toggle) {
      this.foundation.toggle();
    }
  };

  initIconButtonEl = instance => {
    const { initRipple, material } = this.props;

    initRipple(instance);
    this.iconButtonEl = instance;

    if (material) {
      this.initIconEl(instance);
    }
  };

  initIconEl = instance => {
    this.iconEl = instance;
  };

  validateMaterialIcon = () => {
    const { children, toggle, toggleOffContent, toggleOnContent } = this.props;

    if (typeof children !== 'string') {
      throw new Error(
        '`children` must be a `string` when `material` is `true`'
      );
    }

    if (toggle) {
      if (!toggleOffContent) {
        throw new Error(
          'You must have a string value for `toggleOffContent` when `material` is `true`'
        );
      }

      if (!toggleOnContent) {
        throw new Error(
          'You must have a string value for `toggleOnContent` when `material` is `true`'
        );
      }
    }
  };

  validateNonMaterialIcon = () => {
    const { children, toggle, toggleOffClass, toggleOnClass } = this.props;

    if (children.type !== 'i') {
      throw new Error(
        '`children` must NOT be a `string` when `material` is `false`'
      );
    }

    if (toggle) {
      if (!toggleOffClass) {
        throw new Error(
          'You must have a string value for `toggleOffClass` when `material` is `false`'
        );
      }

      if (!toggleOnClass) {
        throw new Error(
          'You must have a string value for `toggleOnClass` when `material` is `false`'
        );
      }
    }
  };

  render() {
    const {
      children, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      href,
      id,
      initRipple, // eslint-disable-line no-unused-vars
      material,
      toggle,
      toggled, // eslint-disable-line no-unused-vars
      toggleOffClass,
      toggleOffContent,
      toggleOffLabel,
      toggleOnClass,
      toggleOnContent,
      toggleOnLabel,
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    if (material) {
      this.validateMaterialIcon();
    } else {
      this.validateNonMaterialIcon();
    }

    const aria = toggle
      ? {
          'aria-label': toggleOffLabel,
          'aria-hidden': true,
          'aria-pressed': false
        }
      : null;

    const data = toggle
      ? {
          'data-toggle-on-class:': toggleOnClass,
          'data-toggle-on-content': toggleOnContent,
          'data-toggle-on-label': toggleOnLabel,
          'data-toggle-off-class': toggleOffClass,
          'data-toggle-off-content': toggleOffContent,
          'data-toggle-off-label': toggleOffLabel
        }
      : null;

    const SemanticButton = href ? 'a' : 'button';

    return (
      <SemanticButton
        id={id}
        className={this.classes}
        href={href}
        onClick={this.handleClick}
        ref={this.initIconButtonEl}
        {...aria}
        {...data}
        {...otherProps}
      >
        {this.renderChildren()}
      </SemanticButton>
    );
  }

  renderChildren() {
    const { children, material } = this.props;

    if (material) {
      return children;
    }

    return React.Children.map(children, child => {
      const childProps = {
        ref: this.initIconEl,
        ...child.props
      };
      return React.cloneElement(child, childProps);
    });
  }
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  initRipple: PropTypes.func,
  material: PropTypes.bool,
  toggle: PropTypes.bool,
  toggled: PropTypes.bool,
  toggleOffClass: PropTypes.string,
  toggleOffContent: PropTypes.string,
  toggleOffLabel: PropTypes.string,
  toggleOnClass: PropTypes.string,
  toggleOnContent: PropTypes.string,
  toggleOnLabel: PropTypes.string,
  unbounded: PropTypes.bool
};

IconButton.defaultProps = {
  children: null,
  className: null,
  href: null,
  id: null,
  initRipple: () => {},
  material: false,
  toggle: false,
  toggled: false,
  toggleOffClass: null,
  toggleOffContent: null,
  toggleOffLabel: null,
  toggleOnClass: null,
  toggleOnContent: null,
  toggleOnLabel: null,
  unbounded: true
};

export default withRipple(IconButton);
