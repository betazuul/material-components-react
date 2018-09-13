import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DrawerListDivider = ({
  children, className, hr, inset, padded,
}) => {
  const classes = classnames('mdc-list-divider', className, {
    'mdc-list-divider--inset': inset,
    'mdc-list-divider--padded': padded,
  });

  const role = {
    role: hr ? null : 'separator',
  };

  const SemanticDivider = hr ? 'hr' : 'li';

  return (
    <SemanticDivider className={classes} {...role}>
      {children}
    </SemanticDivider>
  );
};

DrawerListDivider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hr: PropTypes.bool,
  inset: PropTypes.bool,
  padded: PropTypes.bool,
};

DrawerListDivider.defaultProps = {
  children: null,
  className: null,
  hr: false,
  inset: false,
  padded: false,
};

export default DrawerListDivider;
