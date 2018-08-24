import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCRadioFoundation } from '@material/radio';
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

    this.foundation = new MDCRadioFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setChecked(checked);
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

    onMouseDown(e);
    setTimeout(() => {
      onMouseUp(e);
    }, 100);

    if (!this.foundation.isChecked()) {
      this.foundation.setChecked(true);
    }
  };

  initRadio = instance => {
    const { initRipple } = this.props;
    initRipple(instance);
    this.radioEl = instance;
  };

  initNativeRadio = instance => {
    this.nativeRadioEl = instance;
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      initRipple,
      unbounded,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        <div className={this.classes} ref={this.initRadio} {...otherProps}>
          {this.renderInput()}
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
        {this.renderLabel()}
      </React.Fragment>
    );
  }

  renderInput() {
    const { id, name } = this.props;

    return (
      <input
        type="radio"
        className="mdc-radio__native-control"
        id={id}
        name={name}
        ref={this.initNativeRadio}
      />
    );
  }

  renderLabel() {
    const { disabled, id, label } = this.props;
    
    return label ? (
      <label
        className={classnames('bmc-radio-label', {
          'bmc-radio-label--disabled': disabled
        })}
        htmlFor={id}
        onClick={this.handleLabelClick}
      >
        {label}
      </label>
    ) : null;
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
  id: null,
  initRipple: () => {},
  label: null,
  name: null,
  unbounded: true,
  value: null
};

export default withRipple(Radio);
