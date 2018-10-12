import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

class ListItem extends React.Component {
  get classes() {
    const { activated, className, disabled, selected } = this.props;
    return classnames('mdc-list-item', className, {
      'mdc-list-item--selected': selected,
      'mdc-list-item--activated': activated,
      'mdc-list-item--disabled': disabled
    });
  }

  initListItem = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    this.listItemEl = instance;
    initRipple(this.listItemEl);
  };

  render() {
    const {
      activated,
      children,
      className,
      disabled,
      initRipple,
      selected,
      unbounded,
      ...otherProps
    } = this.props;
    return (
      <li className={this.classes} ref={this.initListItem} {...otherProps}>
        {children}
      </li>
    );
  }
}

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
