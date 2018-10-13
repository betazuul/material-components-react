import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCSnackbarFoundation } from '@material/snackbar/dist/mdc.snackbar';
import { getCorrectEventName } from '@material/animation/dist/mdc.animation';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.actionButtonEl = null;
    this.snackbarEl = null;
    this.textEl = null;
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.foundation = new MDCSnackbarFoundation(this.adapter);
    this.foundation.init();
  }

  componentDidUpdate(prevProps) {
    const { actionHandler, actionText, message, multiline, show } = this.props;
    const { show: prevShow } = prevProps;
    if (show !== prevShow) {
      if (show) {
        const data = {
          message,
          actionHandler,
          actionOnBottom: multiline,
          actionText,
          multiline
        };
        this.foundation.show(data);
      }
    }
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
      setAriaHidden: () => this.snackbarEl.setAttribute('aria-hidden', 'true'),
      unsetAriaHidden: () => this.snackbarEl.removeAttribute('aria-hidden'),
      setActionAriaHidden: () =>
        this.actionButtonEl.setAttribute('aria-hidden', 'true'),
      unsetActionAriaHidden: () =>
        this.actionButtonEl.removeAttribute('aria-hidden'),
      setActionText: text => text,
      setMessageText: text => text,
      setFocus: () => this.actionButtonEl.focus(),
      isFocused: () => document.activeElement === this.actionButtonEl,
      visibilityIsHidden: () => document.hidden,
      registerCapturedBlurHandler: handler =>
        this.actionButtonEl.addEventListener('blur', handler, true),
      deregisterCapturedBlurHandler: handler =>
        this.actionButtonEl.removeEventListener('blur', handler, true),
      registerVisibilityChangeHandler: handler =>
        document.addEventListener('visibilitychange', handler),
      deregisterVisibilityChangeHandler: handler =>
        document.removeEventListener('visibilitychange', handler),
      registerCapturedInteractionHandler: (evt, handler) =>
        document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: handler =>
        this.actionButtonEl.addEventListener('click', handler),
      deregisterActionClickHandler: handler =>
        this.actionButtonEl.removeEventListener('click', handler),
      registerTransitionEndHandler: handler =>
        this.snackbarEl.addEventListener(
          getCorrectEventName(window, 'transitionend'),
          handler
        ),
      deregisterTransitionEndHandler: handler =>
        this.snackbarEl.removeEventListener(
          getCorrectEventName(window, 'transitionend'),
          handler
        ),
      notifyShow: () => {
        const { onShow } = this.props;
        if (onShow) onShow();
      },
      notifyHide: () => {
        const { onHide } = this.props;
        if (onHide) onHide();
      }
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className, startAligned } = this.props;
    return classnames('mdc-snackbar', Array.from(classList), className, {
      'mdc-snackbar--align-start': startAligned
    });
  }

  initActionButton = instance => {
    if (!instance) return;
    this.actionButtonEl = instance;
  };

  initSnackbar = instance => {
    if (!instance) return;
    this.snackbarEl = instance;
  };

  initText = instance => {
    if (!instance) return;
    this.textEl = instance;
  };

  render() {
    const {
      actionHandler,
      actionText,
      className,
      message,
      multiline,
      onHide,
      onShow,
      show,
      startAligned,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
        ref={this.initSnackbar}
        {...otherProps}
      >
        <div className="mdc-snackbar__text" ref={this.initText}>
          {message}
        </div>
        <div className="mdc-snackbar__action-wrapper">
          <button
            type="button"
            className="mdc-snackbar__action-button"
            ref={this.initActionButton}
          >
            {actionText}
          </button>
        </div>
      </div>
    );
  }
}

Snackbar.propTypes = {
  actionHandler: PropTypes.func,
  actionText: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string,
  multiline: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  show: PropTypes.bool
};

Snackbar.defaultProps = {
  actionHandler: null,
  actionText: null,
  className: null,
  message: null,
  multiline: false,
  onHide: () => {},
  onShow: () => {},
  show: false
};

export default Snackbar;
