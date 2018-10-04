import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCRadioFoundation } from '@material/radio/dist/mdc.radio';
import { withRipple } from '@betazuul/ripple';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.radioEl = null;
    this.nativeRadioEl = null;
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    const { checked, disabled, value } = this.props;
    this.mounted = true;
    this.foundation = new MDCRadioFoundation(this.adapter);
    this.foundation.init();

    if (checked) this.foundation.setChecked(checked);
    if (disabled) this.foundation.setDisabled(disabled);
    if (value) this.foundation.setValue(value);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.foundation.destroy();
  }

  get adapter() {
    const { classList } = this.state;
    return {
      addClass: className => {
        if (!this.mounted) return;
        this.setState({ classList: classList.add(className) });
      },
      removeClass: className => {
        if (!this.mounted) return;
        classList.delete(className);
        this.setState({ classList });
      },
      getNativeControl: () => this.nativeRadioEl
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className } = this.props;
    return classnames('mdc-radio', Array.from(classList), className);
  }

  handleLabelClick = e => {
    if (this.foundation.isDisabled()) return;

    const { onMouseDown, onMouseUp } = this.props;
    if (onMouseDown) onMouseDown(e);
    if (onMouseUp) {
      setTimeout(() => {
        onMouseUp(e);
      }, 100);
    }

    if (!this.foundation.isChecked()) {
      this.foundation.setChecked(true);
    }
  };

  initRadio = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    this.radioEl = instance;
    initRipple(this.radioEl);
  };

  initNativeRadio = instance => {
    if (!instance) return;
    this.nativeRadioEl = instance;
  };

  renderLabel() {
    const { disabled, id, label } = this.props;
    if (!label) return null;

    const classes = classnames('bmc-radio-label', {
      'bmc-radio-label--disabled': disabled
    });
    return (
      <label className={classes} htmlFor={id} onClick={this.handleLabelClick}>
        {label}
      </label>
    );
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      checked,
      className,
      disabled,
      id,
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
        <div className={this.classes} ref={this.initRadio} {...otherProps}>
          <input
            type="radio"
            className="mdc-radio__native-control"
            id={id}
            name={name}
            ref={this.initNativeRadio}
          />
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
        {this.renderLabel()}
      </React.Fragment>
    );
  }
}

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  initRipple: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  unbounded: PropTypes.bool,
  value: PropTypes.string.isRequired
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
  initRipple: () => {},
  label: null,
  unbounded: true
};

export default withRipple(Radio);
