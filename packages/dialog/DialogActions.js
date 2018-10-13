import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

const DialogActions = ({
  acceptButton,
  acceptButtonClass,
  acceptButtonLabel,
  children,
  className,
  closeButton,
  closeButtonClass,
  closeButtonLabel,
  onClose,
  ...otherProps
}) => {
  const classes = classnames('mdc-dialog__actions', className);

  const renderDialogButton = action => {
    const accept = action === 'accept';
    const button = accept ? acceptButton : closeButton;
    const buttonClass = accept ? acceptButtonClass : closeButtonClass;
    const buttonLabel = accept ? acceptButtonLabel : closeButtonLabel;
    const onCloseArg = accept ? action : undefined;
    
    return (
      button && (
        <DialogButton
          className={buttonClass}
          action={action}
          onClick={() => onClose(onCloseArg)}
        >
          {buttonLabel}
        </DialogButton>
      )
    );
  };

  return (
    <footer className={classes} {...otherProps}>
      {renderDialogButton('close')}
      {renderDialogButton('accept')}
    </footer>
  );
};

DialogActions.propTypes = {
  acceptButton: PropTypes.bool,
  acceptButtonClass: PropTypes.string,
  acceptButtonLabel: PropTypes.string,
  children: PropTypes.string,
  closeButton: PropTypes.bool,
  closeButtonClass: PropTypes.string,
  closeButtonLabel: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

DialogActions.defaultProps = {
  acceptButton: true,
  acceptButtonClass: null,
  acceptButtonLabel: 'Accept',
  children: null,
  closeButton: true,
  closeButtonClass: null,
  closeButtonLabel: 'Decline',
  className: null
};

class DialogButtonDefault extends React.Component {
  get classes() {
    const { className } = this.props;
    return classnames('mdc-button', 'mdc-dialog__button', className);
  }

  initDialogButton = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    initRipple(instance);
  };

  render() {
    const {
      action,
      children,
      className,
      initRipple,
      unbounded,
      ...otherProps
    } = this.props;

    return (
      <button
        type="button"
        className={this.classes}
        ref={this.initDialogButton}
        data-mdc-dialog-action={action}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

DialogButtonDefault.propTypes = {
  action: PropTypes.oneOf(['accept', 'close']),
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool
};

DialogButtonDefault.defaultProps = {
  action: 'close',
  className: null,
  initRipple: () => {},
  unbounded: false
};

const DialogButton = withRipple(DialogButtonDefault);

export default DialogActions;
