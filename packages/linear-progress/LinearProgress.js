import React from 'react';
import classnames from 'classnames';
// import PropTypes from 'prop-types';
import { MDCLinearProgressFoundation } from '@material/linear-progress';

class LinearProgress extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.bufferEl = null;
    this.primaryBarEl = null;
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    this.foundation = new MDCLinearProgressFoundation(this.adapter);
    this.foundation.init();
    const { buffer, progress } = this.props;
    this.foundation.setBuffer(buffer);
    this.foundation.setProgress(progress);
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter() {
    const { classList } = this.state;
    return {
      addClass: className =>
        this.setState({ classList: classList.add(className) }),
      getPrimaryBar: () => this.primaryBarEl,
      getBuffer: () => this.bufferEl,
      hasClass: className => this.classes.split(' ').includes(className),
      removeClass: className => {
        classList.delete(className);
        this.setState({ classList });
      },
      setStyle: (el, styleProperty, value) => (el.style[styleProperty] = value)
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className, closed, indeterminate, reversed } = this.props;

    return classnames('mdc-linear-progress', Array.from(classList), className, {
      'mdc-linear-progress--indeterminate': indeterminate,
      'mdc-linear-progress--reversed': reversed,
      'mdc-linear-progress--closed': closed
    });
  }

  initBuffer = instance => {
    if (!instance) return;
    this.bufferEl = instance;
  };

  initPrimaryBar = instance => {
    if (!instance) return;
    this.primaryBarEl = instance;
  };

  render() {
    return (
      <div role="progressbar" className={this.classes}>
        <div className="mdc-linear-progress__buffering-dots" />
        <div className="mdc-linear-progress__buffer" ref={this.initBuffer} />
        <div
          className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ref={this.initPrimaryBar}
        >
          <span className="mdc-linear-progress__bar-inner" />
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
      </div>
    );
  }
}

export default LinearProgress;
