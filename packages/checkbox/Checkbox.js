import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getCorrectEventName } from '@material/animation/index';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { withRipple } from '@betazuul/ripple';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.checkboxEl = null;
    this.nativeCheckboxEl = null;
    this.state = {
      classList: new Set(),
      style: null
    };
  }

  componentDidMount() {
    const { checked, disabled, indeterminate, value } = this.props;
    this.foundation = new MDCCheckboxFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setChecked(checked);
    this.foundation.setIndeterminate(indeterminate);
    this.foundation.setDisabled(disabled);
    this.foundation.setValue(value);
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter() {
    const { classList } = this.state;
    return {
      addClass: className =>
        this.setState({ classList: classList.add(className) }),
      removeClass: className => {
        classList.delete(className);
        this.setState({ classList });
      },
      setNativeControlAttr: (attr, value) =>
        this.nativeCheckboxEl.setAttribute(attr, value),
      removeNativeControlAttr: attr =>
        this.nativeCheckboxEl.removeAttribute(attr),
      registerAnimationEndHandler: handler =>
        this.checkboxEl.addEventListener(
          getCorrectEventName(window, 'animationend'),
          handler
        ),
      deregisterAnimationEndHandler: handler =>
        this.checkboxEl.removeEventListener(
          getCorrectEventName(window, 'animationend'),
          handler
        ),
      registerChangeHandler: handler =>
        this.nativeCheckboxEl.addEventListener('change', handler),
      deregisterChangeHandler: handler =>
        this.nativeCheckboxEl.removeEventListener('change', handler),
      getNativeControl: () => this.nativeCheckboxEl,
      forceLayout: () => this.checkboxEl.offsetWidth,
      isAttachedToDOM: () => Boolean(this.checkboxEl.parentNode)
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className } = this.props;

    return classnames('mdc-checkbox', Array.from(classList), className);
  }

  handleLabelClick = e => {
    const { onMouseDown, onMouseUp } = this.props;
    onMouseDown(e);
    setTimeout(() => {
      onMouseUp(e);
    }, 100);
    this.foundation.setChecked(!this.foundation.isChecked());
    if (this.foundation.isIndeterminate()) {
      this.foundation.setIndeterminate(false);
    }
  };

  initCheckbox = instance => {
    const { initRipple } = this.props;
    initRipple(instance);
    this.checkboxEl = instance;
  };

  initNativeCheckbox = instance => {
    this.nativeCheckboxEl = instance;
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      indeterminate,
      initRipple,
      unbounded,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;
    return (
      <React.Fragment>
        <div className={this.classes} ref={this.initCheckbox} {...otherProps}>
          {this.renderInput()}
          {this.renderBackground()}
        </div>
        {this.renderLabel()}
      </React.Fragment>
    );
  }

  renderBackground() {
    return (
      <div className="mdc-checkbox__background">
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path
            className="mdc-checkbox__checkmark-path"
            fill="none"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
        <div className="mdc-checkbox__mixedmark" />
      </div>
    );
  }

  renderInput() {
    const { id, name } = this.props;
    return (
      <input
        type="checkbox"
        className="mdc-checkbox__native-control"
        id={id}
        name={name}
        ref={this.initNativeCheckbox}
      />
    );
  }

  renderLabel() {
    const { id, label } = this.props;
    return label ? (
      <label htmlFor={id} onClick={this.handleLabelClick}>
        {label}
      </label>
    ) : null;
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
  initRipple: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  unbounded: PropTypes.bool,
  value: PropTypes.string.isRequired
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  id: null,
  indeterminate: false,
  initRipple: () => {},
  label: null,
  name: null,
  unbounded: true,
  value: null
};

export default withRipple(Checkbox);
