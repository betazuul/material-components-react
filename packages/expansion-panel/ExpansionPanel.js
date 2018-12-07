import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cssClasses as css } from './constants';
import { MDCExpansionPanelFoundation } from './index';

const cssClasses = {
  HEADER: 'mdc-expansion-panel__header',
  PANEL_ICON: 'mdc-expansion-panel__icon',
  PANEL_TEXT: 'mdc-expansion-panel__text',
  ...css
};

class ExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.state = {
      classList: new Set(),
      style: {}
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.foundation = new MDCExpansionPanelFoundation(this.adapter);
    this.foundation.init();
  }

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    const { expanded: prevExpanded } = prevProps;
    if (expanded !== prevExpanded) {
      if (expanded) {
        this.foundation.expand();
      } else {
        this.foundation.collapse();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.foundation.destroy();
  }

  get adapter() {
    return {
      blur: () => this.expansionPanelEl.blur(),
      hasClass: className => this.classes.split(' ').includes(className),
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
      setAttribute: (attributeName, value) =>
        this.expansionPanelEl.setAttribute(attributeName, value),
      registerInteractionHandler: (type, handler) =>
        this.expansionPanelEl.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) =>
        this.expansionPanelEl.removeEventListener(type, handler),
      notifyChange: () => {
        console.log('notifyChange');
      },
      notifyExpand: () => {
        console.log('notifyExpand');
      },
      notifyCollapse: () => {
        console.log('notifyCollapse');
      },
      setStyle: (styleName, value) => {
        const { style } = this.state;
        const updatedStyle = { ...style };
        updatedStyle[styleName] = value;
        this.setState({ style: updatedStyle });
      },
      getStyle: styleName => {
        const { style } = this.state;
        return style[styleName];
      },
      getComputedHeight: () => getComputedStyle(this.expansionPanelEl).height,
      offsetHeight: () => this.expansionPanelEl.offsetHeight,
      shouldRespondToClickEvent: event =>
        event.target.classList.contains(cssClasses.HEADER) && !event.target.classList.contains(cssClasses.NO_CLICK) ||
        event.target.classList.contains(cssClasses.ICON) && !event.target.classList.contains(cssClasses.NO_CLICK) ||
        event.target.classList.contains(cssClasses.PANEL_ICON) && !event.target.classList.contains(cssClasses.NO_CLICK) ||
        event.target.classList.contains(cssClasses.PANEL_TEXT) && !event.target.classList.contains(cssClasses.NO_CLICK)
    };
  }

  get classes() {
    const { classList } = this.state;
    const { className } = this.props;
    return classnames('mdc-expansion-panel', Array.from(classList), className);
  }

  getMergedStyles = () => {
    const { style } = this.state;
    const { style: propsStyle } = this.props;
    return { ...style, ...propsStyle };
  };

  initExpansionPanel = instance => {
    if (!instance) return;
    this.expansionPanelEl = instance;
  };

  render() {
    const { children, className, expanded, style, ...otherProps } = this.props;
    return (
      <div
        className={this.classes}
        style={this.getMergedStyles()}
        ref={this.initExpansionPanel}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

ExpansionPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
}

ExpansionPanel.defaultProps = {
  children: null,
  className: null,
  expanded: false,
  style: {},
}

export default ExpansionPanel;
