import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListDivider = ({
  children,
  className,
  padded,
  inset,
  hr,
  role,
  ...otherProps
}) => {
  const classes = classnames('mdc-list-divider', className, {
    'mdc-list-divider--padded': padded,
    'mdc-list-divider--inset': inset
  });
  const SemanticDivider = hr ? 'hr' : 'li';

  return (
    <SemanticDivider className={classes} role={role} {...otherProps}>
      {children}
    </SemanticDivider>
  );
};

ListDivider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  padded: PropTypes.bool,
  inset: PropTypes.bool,
  hr: PropTypes.bool,
  role: PropTypes.string
};

ListDivider.defaultProps = {
  children: null,
  className: null,
  padded: false,
  inset: false,
  hr: false,
  role: 'separator'
};

export default ListDivider;
