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
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    const { iconOn, on } = this.props;
    this.foundation = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation.init();

    if (on && iconOn) {
      this.foundation.toggle();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter() {
    const { classList } = this.state;
    const { onChange } = this.props;
    return {
      addClass: className =>
        this.setState({ classList: classList.add(className) }),
      removeClass: className => {
        classList.delete(className);
        this.setState({ classList });
      },
      hasClass: className => this.classes.split(' ').includes(className),
      setAttr: (attrName, attrValue) =>
        this.iconButtonEl.setAttribute(attrName, attrValue),
      notifyChange: event => {
        if (onChange) onChange(event);
      }
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className, material } = this.props;
    return classnames('mdc-icon-button', Array.from(classList), className, {
      'non-material-icons': !material
    });
  }

  handleClick = () => {
    const { iconOn } = this.props;
    if (iconOn) {
      this.foundation.toggle();
    }
  };

  initIconButtonEl = instance => {
    const { initRipple } = this.props;
    initRipple(instance);
    this.iconButtonEl = instance;
  };

  renderIcon = icon => {
    const { iconOn, material } = this.props;
    if (!icon) return null;

    if (typeof icon === 'string') {
      const classes = classnames('mdc-icon-button__icon', {
        'mdc-icon-button__icon--on': icon === iconOn,
        'material-icons': true
      });
      return <i className={classes}>{icon}</i>;
    }

    const { className, ...otherIconProps } = icon.props;
    const classes = classnames('mdc-icon-button__icon', className, {
      'mdc-icon-button__icon--on': icon === iconOn,
      'material-icons': material
    });
    const iconProps = {
      className: classes,
      ...otherIconProps
    };
    return React.cloneElement(icon, iconProps);
  };

  render() {
    const {
      children, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      href,
      icon,
      iconOn,
      iconLabel,
      id,
      initRipple, // eslint-disable-line no-unused-vars
      on,
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    let aria = null;

    if (iconOn) {
      aria = {
        'aria-label': iconLabel,
        'aria-hidden': true,
        'aria-pressed': on
      };
    }

    const SemanticButton = href ? 'a' : 'button';

    return (
      <SemanticButton
        id={id}
        className={this.classes}
        href={href}
        onClick={this.handleClick}
        ref={this.initIconButtonEl}
        {...aria}
        {...otherProps}
      >
        {this.renderIcon(icon)}
        {this.renderIcon(iconOn)}
      </SemanticButton>
    );
  }
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconOn: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconLabel: PropTypes.string,
  id: PropTypes.string,
  initRipple: PropTypes.func,
  on: PropTypes.bool,
  material: PropTypes.bool,
  unbounded: PropTypes.bool
};

IconButton.defaultProps = {
  className: null,
  href: null,
  icon: null,
  iconOn: null,
  iconLabel: null,
  id: null,
  initRipple: () => {},
  on: false,
  material: false,
  unbounded: true
};

export default withRipple(IconButton);
