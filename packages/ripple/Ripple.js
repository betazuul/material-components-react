import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { MDCRippleFoundation, util } from '@material/ripple/dist/mdc.ripple';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withRipple = WrappedComponent => {
  class RippledComponent extends React.Component {
    constructor(props) {
      super(props);
      this.foundation = null;
      this.mounted = true;
      this.state = {
        classList: new Set(),
        style: {}
      };
    }

    componentDidMount() {
      if (!this.foundation) {
        throw new Error(
          "You must call initRipple from the element's ref prop to initialize the adapter for withRipple"
        );
      }
    }

    componentWillUnmount() {
      if (this.foundation) {
        this.mounted = false;
        this.foundation.destroy();
      }
    }

    get classes() {
      const { className: wrappedComponentClasses } = this.props;
      const { classList } = this.state;
      return classnames(Array.from(classList), wrappedComponentClasses);
    }

    get style() {
      const { style: wrappedStyle } = this.props;
      const { style } = this.state;
      return Object.assign({}, style, wrappedStyle);
    }

    // surface: This element receives the visual treatment (classes and style) of the ripple.
    // activator: This element is used to detect whether to activate the ripple. If this is not
    // provided, the ripple surface will be used to detect activation.
    initializeFoundation = (surface, activator) => {
      const adapter = this.createAdapter(surface, activator);
      this.foundation = new MDCRippleFoundation(adapter);
      this.foundation.init();
    };

    createAdapter = (surface, activator) => {
      const { classList } = this.state;
      const { computeBoundingRect, disabled, unbounded } = this.props;
      const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

      return {
        browserSupportsCssVars: () => util.supportsCssVariables(window),
        isUnbounded: () => unbounded,
        isSurfaceActive: () =>
          activator
            ? activator[MATCHES](':active')
            : surface[MATCHES](':active'),
        isSurfaceDisabled: () => disabled,
        addClass: className => {
          if (!this.mounted) {
            return;
          }
          this.setState({ classList: classList.add(className) });
        },
        removeClass: className => {
          if (!this.mounted) {
            return;
          }

          classList.delete(className);
          this.setState({ classList });
        },
        registerDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.addEventListener(
            evtType,
            handler,
            util.applyPassive()
          ),
        deregisterDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.removeEventListener(
            evtType,
            handler,
            util.applyPassive()
          ),
        registerResizeHandler: handler =>
          window.addEventListener('resize', handler),
        deregisterResizeHandler: handler =>
          window.removeEventListener('resize', handler),
        updateCssVariable: this.updateCssVariable,
        computeBoundingRect: () => {
          if (!this.mounted) {
            // need to return object since foundation expects it
            return {};
          }
          if (computeBoundingRect) {
            return computeBoundingRect(surface);
          }
          return surface.getBoundingClientRect();
        },
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset
        })
      };
    };

    handleFocus = e => {
      const { onFocus } = this.props;
      onFocus(e);
      this.foundation.handleFocus();
    };

    handleBlur = e => {
      const { onBlur } = this.props;
      onBlur(e);
      this.foundation.handleBlur();
    };

    handleMouseDown = e => {
      const { onMouseDown } = this.props;
      onMouseDown(e);
      this.activateRipple(e);
    };

    handleMouseUp = e => {
      const { onMouseUp } = this.props;
      onMouseUp(e);
      this.deactivateRipple(e);
    };

    handleTouchStart = e => {
      const { onTouchStart } = this.props;
      onTouchStart(e);
      this.activateRipple(e);
    };

    handleTouchEnd = e => {
      const { onTouchEnd } = this.props;
      onTouchEnd(e);
      this.deactivateRipple(e);
    };

    handleKeyDown = e => {
      const { onKeyDown } = this.props;
      onKeyDown(e);
      this.activateRipple(e);
    };

    handleKeyUp = e => {
      const { onKeyUp } = this.props;
      onKeyUp(e);
      this.deactivateRipple(e);
    };

    activateRipple = e => {
      // https://reactjs.org/docs/events.html#event-pooling
      e.persist();
      requestAnimationFrame(() => {
        this.foundation.activate(e);
      });
    };

    deactivateRipple = e => {
      this.foundation.deactivate(e);
    };

    updateCssVariable = (varName, value) => {
      if (!this.mounted) {
        return;
      }

      const { style } = this.state;
      const updatedStyle = Object.assign({}, style);
      updatedStyle[varName] = value;
      this.setState({ style: updatedStyle });
    };

    render() {
      const {
        /* start black list of otherprops */
        /* eslint-disable */
        unbounded,
        style,
        className,
        onMouseDown,
        onMouseUp,
        onTouchStart,
        onTouchEnd,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        /* eslint-enable */
        /* end black list of otherprops */
        ...otherProps
      } = this.props;

      const updatedProps = Object.assign(otherProps, {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        // call initRipple on ref on root element that needs ripple
        initRipple: this.initializeFoundation,
        className: this.classes,
        style: this.style
      });

      return <WrappedComponent {...updatedProps} />;
    }
  }

  /* eslint-disable */
  WrappedComponent.propTypes = Object.assign(
    {
      unbounded: PropTypes.bool,
      disabled: PropTypes.bool,
      style: PropTypes.object,
      className: PropTypes.string,
      onMouseDown: PropTypes.func,
      onMouseUp: PropTypes.func,
      onTouchStart: PropTypes.func,
      onTouchEnd: PropTypes.func,
      onKeyDown: PropTypes.func,
      onKeyUp: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func
    },
    WrappedComponent.propTypes
  );

  WrappedComponent.defaultProps = Object.assign(
    {
      unbounded: false,
      disabled: false,
      style: {},
      className: '',
      onMouseDown: () => {},
      onMouseUp: () => {},
      onTouchStart: () => {},
      onTouchEnd: () => {},
      onKeyDown: () => {},
      onKeyUp: () => {},
      onFocus: () => {},
      onBlur: () => {}
    },
    WrappedComponent.defaultProps
  );
  /* eslint-enable */

  RippledComponent.propTypes = WrappedComponent.propTypes;
  RippledComponent.defaultProps = WrappedComponent.defaultProps;
  RippledComponent.displayName = `WithRipple(${getDisplayName(
    WrappedComponent
  )})`;

  return RippledComponent;
};

export default withRipple;
