import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCCheckboxFoundation } from '@material/checkbox/dist/mdc.checkbox';
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
    this.mounted = true;
    this.foundation = new MDCCheckboxFoundation(this.adapter);
    this.foundation.init();

    const { checked, disabled, indeterminate, value } = this.props;
    if (checked) this.nativeCheckboxEl.checked = checked;
    if (disabled) this.foundation.setDisabled(disabled);
    if (indeterminate) this.nativeCheckboxEl.indeterminate = indeterminate;
    if (value) this.nativeCheckboxEl.value = value;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.foundation.destroy();
  }

  get adapter() {
    return {
      addClass: className => {
        if (!this.mounted) return;
        const { classList } = this.state;
        classList.add(className);
        this.setState({ classList });
      },
      removeClass: className => {
        if (!this.mounted) return;
        const { classList } = this.state;
        classList.delete(className);
        this.setState({ classList });
      },
      setNativeControlAttr: (attr, value) =>
        this.nativeCheckboxEl.setAttribute(attr, value),
      removeNativeControlAttr: attr =>
        this.nativeCheckboxEl.removeAttribute(attr),
      getNativeControl: () => this.nativeCheckboxEl,
      isIndeterminate: () => this.nativeCheckboxEl.indeterminate,
      isChecked: () => this.nativeCheckboxEl.checked,
      hasNativeControl: () => !!this.nativeCheckboxEl,
      setNativeControlDisabled: disabled => {
        this.nativeCheckboxEl.disabled = disabled;
      },
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
    if (this.nativeCheckboxEl.disabled) return;

    const { onMouseDown, onMouseUp } = this.props;
    if (onMouseDown) onMouseDown(e);
    if (onMouseUp) {
      setTimeout(() => {
        onMouseUp(e);
      }, 100);
    }
  };

  initCheckbox = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    this.checkboxEl = instance;
    initRipple(this.checkboxEl);
  };

  initNativeCheckbox = instance => {
    if (!instance) return;
    this.nativeCheckboxEl = instance;
  };

  renderLabel() {
    const { disabled, id, label } = this.props;
    if (!label) return null;

    const classes = classnames('bmc-checkbox-label', {
      'bmc-checkbox-label--disabled': disabled
    });
    return (
      <label className={classes} htmlFor={id} onClick={this.handleLabelClick}>
        {label}
      </label>
    );
  }

  render() {
    const {
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
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        <div className={this.classes} ref={this.initCheckbox} {...otherProps}>
          <input
            type="checkbox"
            className="mdc-checkbox__native-control"
            id={id}
            name={name}
            ref={this.initNativeCheckbox}
            onChange={this.handleChange}
          />
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
