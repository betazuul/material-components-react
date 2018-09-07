import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCDialogFoundation, util } from '@material/dialog';
import { strings } from '@material/dialog/constants';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.focusTrap = null;
    this.dialogEl = null;
    this.dialogSurfaceEl = null;
    this.state = {
      classList: new Set(),
    };
  }

  componentDidMount() {
    this.focusTrap = util.createFocusTrapInstance(this.dialogSurfaceEl, this.acceptButton);

    this.foundation = new MDCDialogFoundation(this.adapter);
    this.foundation.init();
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (prevProps.open !== open) {
      if (open) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get acceptButton() {
    return this.dialogEl.querySelector(strings.ACCEPT_SELECTOR);
  }

  get adapter() {
    const { classList } = this.state;

    return {
      addClass: className => this.setState({ classList: classList.add(className) }),
      removeClass: (className) => {
        classList.delete(className);
        this.setState({ classList });
      },
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerInteractionHandler: (event, handler) => {
        this.dialogEl.addEventListener(event, handler);
      },
      deregisterInteractionHandler: (event, handler) => {
        this.dialogEl.removeEventListener(event, handler);
      },
      registerSurfaceInteractionHandler: (event, handler) => {
        this.dialogSurfaceEl.addEventListener(event, handler);
      },
      deregisterSurfaceInteractionHandler: (event, handler) => {
        this.dialogSurfaceEl.removeEventListener(event, handler);
      },
      registerDocumentKeydownHandler: handler => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener('keydown', handler),
      registerTransitionEndHandler: handler => this.dialogSurfaceEl.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: handler => this.dialogSurfaceEl.removeEventListener('transitionend', handler),
      notifyAccept: () => {
        const { onAccept } = this.props;
        if (onAccept) {
          onAccept();
        }
      },
      notifyCancel: () => {
        const { onCancel } = this.props;
        if (onCancel) {
          onCancel();
        }
      },
      trapFocusOnSurface: () => this.focusTrap.activate(),
      untrapFocusOnSurface: () => this.focusTrap.deactivate(),
      isDialog: element => element === this.dialogSurfaceEl,
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className } = this.props;
    return classnames('mdc-dialog', Array.from(classList), className);
  }

  getMergedStyles = () => {
    const { style } = this.state;
    const { style: propStyle } = this.props;
    return Object.assign({}, style, propStyle);
  };

  initDialog = (instance) => {
    this.dialogEl = instance;
  };

  initDialogSurface = (instance) => {
    this.dialogSurfaceEl = instance;
  };

  render() {
    const {
      children,
      /* eslint-disable */
      className,
      onAccept,
      onCancel,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <aside
        className={this.classes}
        ref={this.initDialog}
        role="alertdialog"
        style={this.getMergedStyles()}
      >
        <div className="mdc-dialog__surface" ref={this.initDialogSurface} {...otherProps}>
          {children}
        </div>
        <div className="mdc-dialog__backdrop" />
      </aside>
    );
  }
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  focusTrap: PropTypes.oneOf(['accept', 'cancel']),
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
};

Dialog.defaultProps = {
  children: null,
  className: null,
  focusTrap: 'accept',
  onAccept: () => {},
  onCancel: () => {},
};

export default Dialog;
