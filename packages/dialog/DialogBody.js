import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DialogBody = ({
  children, className, dangerouslySetInnerHTML, scrollable,
}) => {
  const classes = classnames('mdc-dialog__body', className, {
    'mdc-dialog__body--scrollable': scrollable,
  });

  if (dangerouslySetInnerHTML) {
    return <section className={classes} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  }

  return <section className={classes}>{children}</section>;
};

DialogBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.any,
  }),
  scrollable: PropTypes.bool,
};

DialogBody.defaultProps = {
  children: null,
  className: null,
  dangerouslySetInnerHTML: null,
  scrollable: false,
};

export default DialogBody;
