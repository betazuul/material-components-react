import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCRippleFoundation, util } from '@material/ripple';

const withRipple = WrappedComponent => {
  class RippledComponent extends Component {
    constructor(props) {
      super(props);
      this.foundation = null;
      this.mounted = null;
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
      const { className: wrappedCompClasses } = this.props;
      const { classList } = this.state;
      return classnames(Array.from(classList), wrappedCompClasses);
    }

    createAdapter = instance => {
      const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

      return {
        browserSupportsCssVars: () => util.supportsCssVariables(window),
        isUnbounded: () => this.props.unbounded,
        isSurfaceActive: () => instance[MATCHES](':active'),
        isSurfaceDisabled: () => this.props.disabled,
        addClass: className => {
          if (!this.mounted) {
            return;
          }
          this.setState({ classList: this.state.classList.add(className) });
        },
        removeClass: className => {
          if (!this.mounted) {
            return;
          }

          const { classList } = this.state;
          classList.delete(className);
          this.setState({ classList });
        },
        registerDocumentInteractionHandler: (event, handler) =>
          document.documentElement.addEventListener(
            event,
            handler,
            util.applyPassive()
          ),
        deregisterDocumentInteractionHandler: (event, handler) =>
          document.documentElement.removeEventListener(
            event,
            handler,
            util.applyPassive()
          ),
        registerResizeHandler: handler =>
          window.addEventListener('resize', handler),
        deregisterResizeHandler: handler =>
          window.removeEventListener('resize', handler),
        updateCssVariable: this.updateCssVariable,
        computeBoundingRect: this.props.computeBoundingRect
          ? () => this.props.computeBoundingRect(instance)
          : () => instance.getBoundingClientRect(),
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset
        })
      };
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

    getMergedStyles = () => {
      const { style: wrappedStyle } = this.props;
      const { style } = this.state;
      return Object.assign({}, style, wrappedStyle);
    };

    handleFocus = e => {
      this.props.onFocus(e);
      this.foundation.handleFocus();
    };

    handleBlur = e => {
      this.props.onBlur(e);
      this.foundation.handleBlur();
    };

    handleMouseDown = e => {
      this.props.onMouseDown(e);
      this.activateRipple(e);
    };

    handleMouseUp = e => {
      this.props.onMouseUp(e);
      this.deactivateRipple(e);
    };

    handleTouchStart = e => {
      this.props.onTouchStart(e);
      this.activateRipple(e);
    };

    handleTouchEnd = e => {
      this.props.onTouchEnd(e);
      this.deactivateRipple(e);
    };

    handleKeyDown = e => {
      this.props.onKeyDown(e);
      this.activateRipple(e);
    };

    handleKeyUp = e => {
      this.props.onKeyUp(e);
      this.deactivateRipple(e);
    };

    initializeFoundation = instance => {
      const adapter = this.createAdapter(instance);
      this.foundation = new MDCRippleFoundation(adapter);
      this.foundation.init();
    };

    updateCssVariable = (varName, value) => {
      if (!this.mounted) {
        return;
      }

      const updatedStyle = Object.assign({}, this.state.style);
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
        style: this.getMergedStyles()
      });

      return <WrappedComponent {...updatedProps} />;
    }
  }

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

  RippledComponent.propTypes = WrappedComponent.propTypes;
  RippledComponent.defaultProps = WrappedComponent.defaultProps;

  return RippledComponent;
};

export default withRipple;
