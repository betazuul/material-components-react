import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation, util } from '@material/drawer';
import { cssClasses } from '@material/drawer/constants';
import createFocusTrap from 'focus-trap';

const strings = {
  PERMANENT: 'permanent',
  DISMISSABLE: 'dismissable',
  MODAL: 'modal',
  LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated',
};

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.drawerEl = null;
    this.focusTrap = null;
    this.previousFocus = null;
    this.state = {
      classList: new Set(),
    };
  }

  componentDidMount() {
    const { type } = this.props;
    const { PERMANENT, DISMISSABLE, MODAL } = strings;
    if (type !== PERMANENT) {
      if (type === DISMISSABLE) {
        this.foundation = new MDCDismissibleDrawerFoundation(this.adapter);
      }

      if (type === MODAL) {
        this.foundation = new MDCModalDrawerFoundation(this.adapter);
        this.focusTrap = util.createFocusTrapInstance(this.drawerEl, createFocusTrap);
      }

      this.foundation.init();
      this.drawerEl.addEventListener('keydown', this.handleKeydown);
      this.drawerEl.addEventListener('transitionend', this.handleTransitionEnd);
    }
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    const { CLOSING } = cssClasses;
    if (prevProps.open !== open && this.foundation) {
      if (open) {
        // Hack to open dismissable drawer
        this.adapter.removeClass(CLOSING);
        this.foundation.open();
      } else {
        this.foundation.close();
        // Hack to close drawer
        this.adapter.addClass(CLOSING);
      }
    }
  }

  componentWillUnmount() {
    const { type } = this.props;
    if (type !== strings.PERMANENT) {
      this.drawerEl.removeEventListener('keydown', this.handleKeydown);
      this.drawerEl.removeEventListener('transitionend', this.handleTransitionEnd);
      this.foundation.destroy();
    }
  }

  get adapter() {
    const { onClose, onOpen } = this.props;
    return {
      addClass: (className) => {
        this.drawerEl.classList.add(className);
      },
      removeClass: (className) => {
        this.drawerEl.classList.remove(className);
      },
      hasClass: (className) => {
        this.drawerEl.classList.contains(className);
      },
      elementHasClass: (element, className) => {
        element.classList.contains(className);
      },
      computeBoundingRect: () => this.drawerEl.getBoundingClientRect(),
      saveFocus: () => {
        this.previousFocus = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this.previousFocus && this.previousFocus.focus;
        if (this.drawerEl.contains(document.activeElement) && previousFocus) {
          this.previousFocus.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = this.drawerEl.querySelector(strings.LIST_ITEM_ACTIVATED_SELECTOR);
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => {
        if (onClose) onClose();
      },
      notifyOpen: () => {
        if (onOpen) onOpen();
      },
      trapFocus: () => this.focusTrap.activate(),
      releaseFocus: () => this.focusTrap.deactivate(),
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className, type } = this.props;
    const { DISMISSABLE, MODAL } = strings;
    return classnames('mdc-drawer', Array.from(classList), className, {
      'mdc-drawer--dismissible': type === DISMISSABLE,
      'mdc-drawer--modal': type === MODAL,
    });
  }

  handleKeydown = (event) => {
    if (this.foundation) this.foundation.handleKeydown(event);
  };

  handleScrimClick = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
    if (this.foundation) this.foundation.handleScrimClick();
  };

  handleTransitionEnd = (event) => {
    if (this.foundation) {
      this.foundation.handleTransitionEnd(event);
      // Hack to remove all unnecessary animation classes
      const {
        ANIMATE, CLOSING, OPEN, OPENING,
      } = cssClasses;
      if (this.drawerEl.classList.contains(CLOSING)) {
        this.adapter.removeClass(OPEN);
        this.adapter.releaseFocus();
      } else {
        this.adapter.focusActiveNavigationItem();
      }
      this.adapter.removeClass(ANIMATE);
      this.adapter.removeClass(OPENING);
      this.adapter.removeClass(CLOSING);
    }
  };

  initDrawer = (instance) => {
    this.drawerEl = instance;
  };

  renderScrim() {
    const { type } = this.props;
    const { MODAL } = strings;
    if (type === MODAL) {
      return (
        <div className="mdc-drawer-scrim" onClick={this.handleScrimClick} /> // eslint-disable-line
      );
    }
    return null;
  }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <aside className={this.classes} ref={this.initDrawer}>
          {children}
        </aside>
        {this.renderScrim()}
      </React.Fragment>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.oneOf([strings.PERMANENT, strings.DISMISSABLE, strings.MODAL]),
};

Drawer.defaultProps = {
  children: null,
  className: null,
  open: false,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  type: strings.PERMANENT,
};

export default Drawer;
export { strings };
