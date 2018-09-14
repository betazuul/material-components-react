import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

const DrawerListItem = ({
  activated,
  children,
  className,
  href,
  initRipple,
  selected,
  unbounded, // eslint-disable-line no-unused-vars
  ...otherProps
}) => {
  const classes = classnames('mdc-list-item', className, {
    'mdc-list-item--activated': activated,
    'mdc-list-item--selected': selected
  });
  const aria = {
    'aria-selected': selected ? true : null
  };
  const SemanticListItem = href ? 'a' : 'nav';
  return (
    <SemanticListItem
      className={classes}
      href={href}
      ref={initRipple}
      {...aria}
      {...otherProps}
    >
      {children}
    </SemanticListItem>
  );
};

DrawerListItem.propTypes = {
  activated: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  initRipple: PropTypes.func,
  selected: PropTypes.bool,
  unbounded: PropTypes.bool
};

DrawerListItem.defaultProps = {
  activated: false,
  children: null,
  className: null,
  href: null,
  initRipple: () => {},
  selected: false,
  unbounded: false
};

export default withRipple(DrawerListItem);
