import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRipple } from '@betazuul/ripple';

class DrawerListItem extends React.Component {
  get classes() {
    const { activated, className, selected } = this.props;
    return classnames('mdc-list-item', className, {
      'mdc-list-item--activated': activated,
      'mdc-list-item--selected': selected
    });
  }

  initDrawerListItem = instance => {
    if (!instance) return;
    const { initRipple } = this.props;
    initRipple(instance);
  };

  render() {
    const {
      activated,
      children,
      className,
      href,
      initRipple,
      selected,
      unbounded,
      ...otherProps
    } = this.props;

    const aria = {
      'aria-selected': selected ? true : null
    };

    const SemanticListItem = href ? 'a' : 'nav';

    return (
      <SemanticListItem
        className={this.classes}
        href={href}
        ref={this.initDrawerListItem}
        {...aria}
        {...otherProps}
      >
        {children}
      </SemanticListItem>
    );
  }
}

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
