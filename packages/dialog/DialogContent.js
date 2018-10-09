import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DialogContent = ({ children, className, dangerouslySetInnerHTML }) => {
  const classes = classnames('mdc-dialog__content', className);

  if (dangerouslySetInnerHTML) {
    return (
      <div
        className={classes}
        id="my-dialog-content"
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  }

  return (
    <div className={classes} id="my-dialog-content">
      {children}
    </div>
  );
};

DialogContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.any
  })
};

DialogContent.defaultProps = {
  children: null,
  className: null,
  dangerouslySetInnerHTML: null
};

export default DialogContent;
