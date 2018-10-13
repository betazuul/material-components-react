import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MDCListFoundation } from '@material/list/dist/mdc.list';

const { cssClasses, strings } = MDCListFoundation;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.foundation = null;
    this.listEl = null;
  }

  componentDidMount() {
    this.foundation = new MDCListFoundation(this.adapter);
    this.foundation.init();

    this.layout();
    this.initializeListType();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter() {
    return {
      getListItemCount: () => this.listElements.length,
      getFocusedElementIndex: () =>
        this.listElements.indexOf(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const element = this.listElements[index];
        if (element) {
          element.setAttribute(attr, value);
        }
      },
      removeAttributeForElementIndex: (index, attr) => {
        const element = this.listElements[index];
        if (element) {
          element.removeAttribute(attr);
        }
      },
      addClassForElementIndex: (index, className) => {
        const element = this.listElements[index];
        if (element) {
          element.classList.add(className);
        }
      },
      removeClassForElementIndex: (index, className) => {
        const element = this.listElements[index];
        if (element) {
          element.classList.remove(className);
        }
      },
      focusItemAtIndex: index => {
        const element = this.listElements[index];
        if (element) {
          element.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const element = this.listElements[listItemIndex];
        const listItemChildren = [].slice.call(
          element.querySelectorAll(strings.FOCUSABLE_CHILD_ELEMENTS)
        );
        listItemChildren.forEach(ele =>
          ele.setAttribute('tabindex', tabIndexValue)
        );
      },
      followHref: index => {
        const listItem = this.listElements[index];
        if (listItem && listItem.href) {
          listItem.click();
        }
      }
    };
  }

  get classes() {
    const {
      className,
      nonInteractive,
      dense,
      avatarList,
      twoLine
    } = this.props;
    return classnames('mdc-list', className, {
      'mdc-list--non-interactive': nonInteractive,
      'mdc-list--dense': dense,
      'mdc-list--avatar-list': avatarList,
      'mdc-list--two-line': twoLine
    });
  }

  get listElements() {
    return [].slice.call(
      this.listEl.querySelectorAll(strings.ENABLED_ITEMS_SELECTOR)
    );
  }

  layout = () => {
    // List items need to have at least tabindex=-1 to be focusable.
    [].slice
      .call(this.listEl.querySelectorAll('.mdc-list-item:not([tabindex])'))
      .forEach(el => {
        el.setAttribute('tabindex', -1);
      });

    // Child button/a elements are not tabbable until the list item is focused.
    [].slice
      .call(this.listEl.querySelectorAll(strings.FOCUSABLE_CHILD_ELEMENTS))
      .forEach(el => el.setAttribute('tabindex', -1));
  };

  getListItemIndex = event => {
    let eventTarget = event.target;
    let index = -1;

    // Find the first ancestor that is a list item or the list.
    while (
      !eventTarget.classList.contains(cssClasses.LIST_ITEM_CLASS) &&
      !eventTarget.classList.contains(cssClasses.ROOT)
    ) {
      eventTarget = eventTarget.parentElement;
    }

    // Get the index of the element if it is a list item.
    if (eventTarget.classList.contains(cssClasses.LIST_ITEM_CLASS)) {
      index = this.listElements.indexOf(eventTarget);
    }

    return index;
  };

  handleClick = () => {
    this.foundation.handleClick();
  };

  handleFocusInEvent = event => {
    const index = this.getListItemIndex(event);
    this.foundation.handleFocusIn(event, index);
  };

  handleFocusOutEvent = event => {
    const index = this.getListItemIndex(event);
    this.foundation.handleFocusOut(event, index);
  };

  handleKeydown = event => {
    const index = this.getListItemIndex(event);

    if (index >= 0) {
      this.foundation.handleKeydown(
        event,
        event.target.classList.contains(cssClasses.LIST_ITEM_CLASS),
        index
      );
    }
  };

  initializeListType = () => {
    // Automatically set single selection if selected/activated classes are present.
    const preselectedElement = this.listEl.querySelector(
      `.${cssClasses.LIST_ITEM_ACTIVATED_CLASS}, .${cssClasses.LIST_ITEM_SELECTED_CLASS}` // prettier-ignore
    );

    if (preselectedElement) {
      if (
        preselectedElement.classList.contains(
          cssClasses.LIST_ITEM_ACTIVATED_CLASS
        )
      ) {
        this.foundation.setUseActivatedClass(true);
      }

      this.foundation.setSingleSelection(true);
      this.foundation.setSelectedIndex(
        this.listElements.indexOf(preselectedElement)
      );
    }
  };

  initList = instance => {
    if (!instance) return;
    this.listEl = instance;
  };

  render() {
    const {
      avatarList,
      children,
      className,
      dense,
      nonInteractive,
      orientation,
      singleSelection,
      twoLine,
      ...otherProps
    } = this.props;

    const aria = {
      'aria-orientation': orientation
    };

    return (
      // eslint-disable-next-line
      <ul
        className={this.classes}
        ref={this.initList}
        onClick={this.handleClick}
        {...aria}
        {...otherProps}
      >
        {children}
      </ul>
    );
  }
}

List.propTypes = {
  avatarList: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  nonInteractive: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  singleSelection: PropTypes.bool,
  twoLine: PropTypes.bool
};

List.defaultProps = {
  avatarList: false,
  children: null,
  className: null,
  dense: false,
  nonInteractive: false,
  orientation: 'vertical',
  singleSelection: false,
  twoLine: false
};

export default List;
