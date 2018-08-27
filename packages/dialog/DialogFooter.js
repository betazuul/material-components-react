import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DialogFooter = ({
  alert,
  acceptButton,
  acceptButtonClass,
  acceptButtonLabel,
  cancelButton,
  cancelButtonClass,
  cancelButtonLabel,
  className
}) => {
  const classes = classnames('mdc-dialog__footer', className);

  const acceptButtonClasses = classnames(
    'mdc-button',
    'mdc-dialog__footer__button',
    'mdc-dialog__footer__button--accept',
    acceptButtonClass
  );

  const cancelButtonClasses = classnames(
    'mdc-button',
    'mdc-dialog__footer__button',
    'mdc-dialog__footer__button--cancel',
    cancelButtonClass
  );

  cancelButtonLabel = alert ? 'Ok' : cancelButtonLabel;

  const renderButton = (btn, btnClasses, btnLabel, alert) => {
    if (alert) return null;
    if (React.isValidElement(btn)) {
      const btnProps = {
        className: btnClasses,
        ...btn.props
      };
      return React.cloneElement(btn, btnProps);
    }

    if (btn) {
      return (
        <button type="button" className={btnClasses}>
          {btnLabel}
        </button>
      );
    }

    return null;
  };

  return (
    <footer className={classes}>
      {renderButton(cancelButton, cancelButtonClasses, cancelButtonLabel)}
      {renderButton(
        acceptButton,
        acceptButtonClasses,
        acceptButtonLabel,
        alert
      )}
    </footer>
  );
};

DialogFooter.propTypes = {
  acceptButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  acceptButtonClass: PropTypes.string,
  acceptButtonLabel: PropTypes.string,
  cancelButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  cancelButtonClass: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

DialogFooter.defaultProps = {
  acceptButton: true,
  acceptButtonClass: null,
  acceptButtonLabel: 'Accept',
  cancelButton: true,
  cancelButtonClass: null,
  cancelButtonLabel: 'Decline',
  children: null,
  className: null
};

export default DialogFooter;
