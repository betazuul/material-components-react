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

  const cancelBtnLabel = alert ? 'Ok' : cancelButtonLabel;

  const renderButton = (btn, btnClasses, btnLabel, isAlert) => {
    if (isAlert) return null;
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
      {renderButton(cancelButton, cancelButtonClasses, cancelBtnLabel)}
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
  alert: PropTypes.bool,
  acceptButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  acceptButtonClass: PropTypes.string,
  acceptButtonLabel: PropTypes.string,
  cancelButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  cancelButtonClass: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  className: PropTypes.string
};

DialogFooter.defaultProps = {
  alert: false,
  acceptButton: true,
  acceptButtonClass: null,
  acceptButtonLabel: 'Accept',
  cancelButton: true,
  cancelButtonClass: null,
  cancelButtonLabel: 'Decline',
  className: null
};

export default DialogFooter;
