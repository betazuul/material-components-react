import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

const ListItem = ({
  children,
  className,
  selected,
  activated,
  disabled,
  initRipple,
  unbounded,
  ...otherProps
}) => {
  const classes = classnames('mdc-list-item', className, {
    'mdc-list-item--selected': selected,
    'mdc-list-item--activated': activated,
    'mdc-list-item--disabled': disabled,
  });

  const renderChildren = () =>
    React.Children.map(children, item => {
      if (typeof item === 'string') {
        return <span className="mdc-list-item__text">{item}</span>;
      }
      return item;
    });

  return (
    <li className={classes} ref={initRipple} {...otherProps}>
      {renderChildren()}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selected: PropTypes.bool,
  activated: PropTypes.bool,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool
};

ListItem.defaultProps = {
  children: null,
  className: null,
  selected: false,
  activated: false,
  initRipple: () => {},
  unbounded: false
};

export default withRipple(ListItem);
// export default ListItem;
