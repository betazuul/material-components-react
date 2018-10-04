import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { withRipple } from '@betazuul/ripple';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.checkboxEl = null;
    this.nativeCheckboxEl = null;
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    const { checked, disabled, indeterminate, value } = this.props;

    this.foundation = new MDCCheckboxFoundation(this.adapter);
    this.foundation.init();

    if (checked) this.foundation.setChecked(checked);
    if (indeterminate) this.foundation.setIndeterminate(indeterminate);
    if (disabled) this.foundation.setDisabled(disabled);
    if (value) this.foundation.setValue(value);
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

  handleChange = () => {
    this.foundation.handleChange();
  };

  handleLabelClick = e => {
    const { onMouseDown, onMouseUp } = this.props;

    if (this.foundation.isDisabled()) return;

    if (onMouseDown) onMouseDown(e);
    if (onMouseUp) {
      setTimeout(() => {
        onMouseUp(e);
      }, 100);
    }
  };

  initCheckbox = instance => {
    const { initRipple } = this.props;

    if (!instance) return;

    this.checkboxEl = instance;
    initRipple(instance);
  };

  initNativeCheckbox = instance => {
    this.nativeCheckboxEl = instance;
  };

  renderBackground = () => (
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

  renderInput() {
    const { id, name } = this.props;
    return (
      <input
        type="checkbox"
        className="mdc-checkbox__native-control"
        id={id}
        name={name}
        ref={this.initNativeCheckbox}
        onClick={this.handleChange}
      />
    );
  }

  renderLabel() {
    const { disabled, id, label } = this.props;
    if (label) {
      const classes = classnames('bmc-checkbox-label', {
        'bmc-checkbox-label--disabled': disabled
      });
      return (
        <label className={classes} htmlFor={id} onClick={this.handleLabelClick}>
          {label}
        </label>
      );
    }

    return null;
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      checked,
      className,
      disabled,
      id,
      indeterminate,
      initRipple,
      label,
      name,
      unbounded,
      value,
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
  indeterminate: false,
  initRipple: () => {},
  label: null,
  unbounded: true
};

export default withRipple(Checkbox);
