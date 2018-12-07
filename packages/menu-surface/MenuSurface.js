import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  MDCMenuSurfaceFoundation,
  Corner
} from '@material/menu-surface/dist/mdc.menuSurface';

class MenuSurface extends React.Component {
  constructor(props) {
    super(props);
    this.menuSurfaceEl = React.createRef();
    this.previousFocus = null;
    this.foundation = null;
    this.state = {
      transformOrigin: '',
      maxHeight: '',
      styleLeft: null,
      styleRight: null,
      styleTop: null,
      styleBottom: null,
      classList: new Set()
    };
  }

  componentDidMount() {
    const {
      anchorCorner,
      anchorMargin,
      coordinates,
      fixed,
      open,
      quickOpen
    } = this.props;
    this.handleWindowClick = evt => this.foundation.handleBodyClick(evt);

    this.registerWindowClickListener = () =>
      window.addEventListener('click', this.handleWindowClick);
    this.deregisterWindowClickListener = () =>
      window.removeEventListener('click', this.handleWindowClick);

    this.foundation = new MDCMenuSurfaceFoundation(this.adapter);
    this.foundation.init();

    this.hoistToBody();
    this.foundation.setFixedPosition(fixed);
    if (coordinates) {
      this.setCoordinates();
    }
    if (anchorCorner) {
      this.foundation.setAnchorCorner(anchorCorner);
    }
    if (anchorMargin) {
      this.foundation.setAnchorMargin(anchorMargin);
    }
    if (quickOpen) {
      this.foundation.setQuickOpen(quickOpen);
    }

    if (open) {
      this.openMenuSurface();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      anchorCorner,
      anchorMargin,
      coordinates,
      open,
      quickOpen
    } = this.props;
    if (open !== prevProps.open) {
      this.openMenuSurface();
    }
    if (coordinates !== prevProps.coordinates) {
      this.setCoordinates();
    }
    if (anchorCorner !== prevProps.anchorCorner) {
      this.foundation.setAnchorCorner(anchorCorner);
    }
    if (anchorMargin !== prevProps.anchorMargin) {
      this.foundation.setAnchorMargin(anchorMargin);
    }
    if (quickOpen !== prevProps.quickOpen) {
      this.foundation.setQuickOpen(quickOpen);
    }
  }

  componentWillUnmount() {
    this.deregisterWindowClickListener();
    this.foundation.destroy();
  }

  get classes() {
    const { fixed, className } = this.props;
    const { classList } = this.state;
    return classnames('mdc-menu-surface', Array.from(classList), className, {
      'mdc-menu-surface--fixed': fixed
    });
  }

  get styles() {
    const {
      styleLeft,
      styleRight,
      styleTop,
      styleBottom,
      transformOrigin,
      maxHeight
    } = this.state;
    const { styles } = this.props;
    return Object.assign({}, styles, {
      transformOrigin,
      maxHeight,
      left: styleLeft,
      right: styleRight,
      top: styleTop,
      bottom: styleBottom
    });
  }

  get adapter() {
    const focusAdapterMethods = {
      isFocused: () =>
        this.menuSurfaceEl &&
        document.activeElement === this.menuSurfaceEl.current,
      saveFocus: () => {
        this.previousFocus = document.activeElement;
      },
      restoreFocus: () => {
        if (
          this.menuSurfaceEl &&
          this.menuSurfaceEl.current.contains(document.activeElement)
        ) {
          if (this.previousFocus && this.previousFocus.focus) {
            this.previousFocus.focus();
          }
        }
      },
      isFirstElementFocused: () =>
        this.firstFocusableEl &&
        this.firstFocusableEl === document.activeElement,
      isLastElementFocused: () =>
        this.lastFocusableEl && this.lastFocusableEl === document.activeElement,
      focusFirstElement: () =>
        this.firstFocusableEl &&
        this.firstFocusableEl.focus &&
        this.firstFocusableEl.focus(),
      focusLastElement: () =>
        this.lastFocusableEl &&
        this.lastFocusableEl.focus &&
        this.lastFocusableEl.focus()
    };

    const dimensionAdapterMethods = {
      getInnerDimensions: () => {
        if (!this.menuSurfaceEl) return {};
        const element = this.menuSurfaceEl.current;
        return { width: element.offsetWidth, height: element.offsetHeight };
      },
      getAnchorDimensions: () => {
        const { anchorElement } = this.props;
        return anchorElement && anchorElement.getBoundingClientRect();
      },
      getWindowDimensions: () => ({
        width: window.innerWidth,
        height: window.innerHeight
      }),
      getBodyDimensions: () => ({
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }),
      getWindowScroll: () => ({ x: window.pageXOffset, y: window.pageYOffset }),
      setPosition: position => {
        this.setState({
          styleLeft: 'left' in position ? position.left : null,
          styleRight: 'right' in position ? position.right : null,
          styleTop: 'top' in position ? position.top : null,
          styleBottom: 'bottom' in position ? position.bottom : null
        });
      },
      setMaxHeight: maxHeight => this.setState({ maxHeight })
    };

    return Object.assign(
      {
        addClass: className => {
          const { classList } = this.state;
          classList.add(className);
          this.setState({ classList });
        },
        removeClass: className => {
          const { classList } = this.state;
          classList.delete(className);
          this.setState({ classList });
        },
        hasClass: className => this.classes.split(' ').includes(className),
        hasAnchor: () => {
          const { anchorElement } = this.props;
          return !!anchorElement;
        },
        notifyOpen: () => {
          this.registerWindowClickListener();
          const { onOpen } = this.props;
          onOpen();
        },
        notifyClose: () => {
          this.deregisterWindowClickListener();
          const { onClose } = this.props;
          onClose();
        },
        isElementInContainer: el =>
          (this.menuSurfaceEl && this.menuSurfaceEl.current === el) ||
          this.menuSurfaceEl.current.contains(el),
        isRtl: () => {
          const { dir } = this.props;
          return dir === 'rtl';
        },
        setTransformOrigin: transformOrigin =>
          this.setState({ transformOrigin })
      },
      focusAdapterMethods,
      dimensionAdapterMethods
    );
  }

  setCoordinates() {
    const { coordinates } = this.props;
    if (!coordinates) return;
    const { x, y } = coordinates;
    this.foundation.setAbsolutePosition(x, y);
  }

  openMenuSurface = () => {
    const { open } = this.props;
    if (open) {
      const focusableElements = this.menuSurfaceEl.current.querySelectorAll(
        MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS
      );
      this.firstFocusableEl =
        focusableElements.length > 0 ? focusableElements[0] : null;
      this.lastFocusableEl =
        focusableElements.length > 0
          ? focusableElements[focusableElements.length - 1]
          : null;
      this.foundation.open();
    } else {
      this.foundation.close();
    }
  };

  handleKeydown = event => {
    const { onKeyDown } = this.props;
    onKeyDown(event);
    this.foundation.handleKeydown(event);
  };

  hoistToBody() {
    // this deviates from the mdc web version.
    // here we force the menu to hoist, and require either
    // this.props.(x,y) or this.props.anchorElement.
    if (!(this.menuSurfaceEl && this.menuSurfaceEl.current)) return;
    const menuSurfaceEl = this.menuSurfaceEl.current;
    document.body.appendChild(
      menuSurfaceEl.parentElement.removeChild(menuSurfaceEl)
    );
    this.foundation.setIsHoisted(true);
  }

  render() {
    const {
      anchorCorner,
      anchorElement,
      anchorMargin,
      children,
      className,
      coordinates,
      fixed,
      onClose,
      onOpen,
      onKeyDown,
      styles,
      quickOpen,
      ...otherProps
    } = this.props;
    return (
      // eslint-disable-next-line
      <div
        className={this.classes}
        onKeyDown={this.handleKeydown}
        ref={this.menuSurfaceEl}
        style={this.styles}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

MenuSurface.propTypes = {
  anchorCorner: PropTypes.number,
  anchorElement: PropTypes.objectOf(PropTypes.any),
  anchorMargin: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onClose: PropTypes.func,
  onKeyDown: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.any),
  quickOpen: PropTypes.bool
};

MenuSurface.defaultProps = {
  anchorCorner: 0,
  anchorElement: null,
  anchorMargin: {},
  children: null,
  className: null,
  coordinates: null,
  fixed: false,
  onClose: () => {},
  onKeyDown: () => {},
  onOpen: () => {},
  open: false,
  styles: {},
  quickOpen: false
};

export default MenuSurface;
export { Corner };
