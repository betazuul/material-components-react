import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation,
  util
} from '@material/drawer/dist/mdc.drawer';
import createFocusTrap from 'focus-trap';

const { cssClasses } = MDCDismissibleDrawerFoundation;
const strings = {
  PERMANENT: 'permanent',
  DISMISSABLE: 'dismissable',
  MODAL: 'modal',
  LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated'
};

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.drawerEl = null;
    this.focusTrap = null;
    this.focusTrapFactory = createFocusTrap;
    this.initialFocusEl = null;
    this.previousFocus = null;
    this.state = {
      classList: new Set()
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { type } = this.props;
    const { PERMANENT, DISMISSABLE, MODAL } = strings;

    if (type !== PERMANENT) {
      this.drawerEl.addEventListener('transitionend', this.handleTransitionEnd);
      this.drawerEl.addEventListener('keydown', this.handleKeydown);

      if (type === DISMISSABLE) {
        this.foundation = new MDCDismissibleDrawerFoundation(this.adapter);
      }

      if (type === MODAL) {
        this.foundation = new MDCModalDrawerFoundation(this.adapter);
        this.focusTrap = util.createFocusTrapInstance(
          this.drawerEl,
          this.focusTrapFactory,
          this.initialFocusEl
        );
        this.focusTrap = null;
      }

      this.foundation.init();
    }
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    const { open: prevOpen } = prevProps;
    if (open !== prevOpen && this.foundation) {
      if (open) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    const { type } = this.props;
    if (type !== strings.PERMANENT) {
      this.drawerEl.removeEventListener(
        'transitionend',
        this.handleTransitionEnd
      );
      this.drawerEl.removeEventListener('keydown', this.handleKeydown);
      this.foundation.destroy();
    }
  }

  get adapter() {
    return {
      addClass: className => {
        if (!this.mounted) return;
        const { classList } = this.state;
        classList.add(className);
        this.setState({ classList });
      },
      removeClass: className => {
        if (!this.mounted) return;
        const { classList } = this.state;
        classList.delete(className);
        this.setState({ classList });
      },
      hasClass: className => this.classes.split(' ').includes(className),
      elementHasClass: (element, className) =>
        element.classList.contains(className),
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
        const activeNavItemEl = this.drawerEl.querySelector(
          strings.LIST_ITEM_ACTIVATED_SELECTOR
        );
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => {
        const { onClose } = this.props;
        if (onClose) onClose();
      },
      notifyOpen: () => {
        const { onOpen } = this.props;
        if (onOpen) onOpen();
      },
      trapFocus: () => {
        if (!this.focusTrap) return;
        this.focusTrap.activate();
      },
      releaseFocus: () => {
        if (!this.focusTrap) return;
        this.focusTrap.deactivate();
      }
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className, type } = this.props;
    const { DISMISSABLE, MODAL } = strings;
    return classnames('mdc-drawer', Array.from(classList), className, {
      'mdc-drawer--dismissible': type === DISMISSABLE,
      'mdc-drawer--modal': type === MODAL
    });
  }

  handleKeydown = event => {
    if (this.foundation) this.foundation.handleKeydown(event);
  };

  handleScrimClick = () => {
    if (this.foundation) this.foundation.handleScrimClick();
  };

  handleTransitionEnd = event => {
    if (this.foundation) {
      this.foundation.handleTransitionEnd(event);
      // Hack to remove all unnecessary animation classes
      const { ANIMATE, CLOSING, OPEN, OPENING } = cssClasses;
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

  initDrawer = instance => {
    if (!instance) return;
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
  type: PropTypes.oneOf([strings.PERMANENT, strings.DISMISSABLE, strings.MODAL])
};

Drawer.defaultProps = {
  children: null,
  className: null,
  open: false,
  onOpen: () => {},
  onClose: () => {},
  type: strings.PERMANENT
};

const DismissableDrawer = ({children, ...otherProps}) => (
  <Drawer type={strings.DISMISSABLE} {...otherProps}>
    {children}
  </Drawer>
);

const ModalDrawer = ({children, ...otherProps}) => (
  <Drawer type={strings.MODAL} {...otherProps}>
    {children}
  </Drawer>
);

const PermanentDrawer = ({children, ...otherProps}) => (
  <Drawer type={strings.PERMANENT} {...otherProps}>
    {children}
  </Drawer>
);

export { DismissableDrawer, ModalDrawer, PermanentDrawer, strings };
