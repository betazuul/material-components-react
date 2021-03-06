import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCDialogFoundation, util } from '@material/dialog/dist/mdc.dialog';
import { closest, matches } from '@material/dom/dist/mdc.dom';
import createFocusTrap from 'focus-trap';

const { strings } = MDCDialogFoundation;

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.buttonsEl = null;
    this.contentEl = null;
    this.defaultButtonEl = null;
    this.dialogEl = null;
    this.focusTrap = null;
    this.focusTrapFactory = createFocusTrap;
    this.initialFocusEl = null;
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    this.mounted = true;

    this.foundation = new MDCDialogFoundation(this.adapter);
    this.foundation.init();

    const { simple } = this.props;
    if (!simple) {
      this.focusTrap = util.createFocusTrapInstance(
        this.containerEl,
        this.focusTrapFactory,
        this.initialFocusEl
      );
    }

    this.buttonsEl = [].slice.call(
      this.dialogEl.querySelectorAll(strings.BUTTON_SELECTOR)
    );

    this.defaultButtonEl = this.dialogEl.querySelector(
      strings.DEFAULT_BUTTON_SELECTOR
    );
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
      hasClass: className => this.classes.split(' ').includes(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetMatches: (target, selector) => matches(target, selector),
      trapFocus: () => {
        if (!this.focusTrap) return;
        this.focusTrap.activate();
      },
      releaseFocus: () => {
        if (!this.focusTrap) return;
        this.focusTrap.deactivate();
      },
      isContentScrollable: () => {
        const { scrollable } = this.props;
        return scrollable;
      },
      areButtonsStacked: () => util.areTopsMisaligned(this.buttonsEl),
      getActionFromEvent: event => {
        const element = closest(event.target, `[${strings.ACTION_ATTRIBUTE}]`);
        return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        if (this.defaultButtonEl) {
          this.defaultButtonEl.click();
        }
      },
      reverseButtons: () => {
        this.buttonsEl.reverse();
        this.buttonsEl.forEach(button =>
          button.parentElement.appendChild(button)
        );
      }
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className } = this.props;
    return classnames('mdc-dialog', Array.from(classList), className);
  }

  handleScrimClick = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
  };

  initDialog = instance => {
    if (!instance) return;
    this.dialogEl = instance;
  };

  initDialogContainer = instance => {
    if (!instance) return;
    this.containerEl = instance;
  };

  render() {
    const {
      children,
      className,
      onClose,
      open,
      scrollable,
      simple,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
        ref={this.initDialog}
        {...otherProps}
      >
        <div className="mdc-dialog__container" ref={this.initDialogContainer}>
          <div className="mdc-dialog__surface">{children}</div>
        </div>
        {/* eslint-disable */}
        <div className="mdc-dialog__scrim" onClick={this.handleScrimClick} />
        {/* eslint-enable */}
      </div>
    );
  }
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  scrollable: PropTypes.bool,
  simple: PropTypes.bool
};

Dialog.defaultProps = {
  children: null,
  className: null,
  onClose: () => {},
  open: false,
  scrollable: false,
  simple: false
};

export default Dialog;
