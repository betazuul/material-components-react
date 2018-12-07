/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MDCComponent } from '@material/base/dist/mdc.base';
import { strings, cssClasses } from './constants';

import MDCExpansionPanelFoundation from './foundation';
import * as util from './util';
import { MDCExpansionPanelAccordion } from './accordion/index';
import MDCExpansionPanelAccordionFoundation from './accordion/foundation';

/**
 * @extends {MDCComponent<!MDCExpansionPanelFoundation>}
 */
class MDCExpansionPanel extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCExpansionPanel}
   */
  static attachTo(root) {
    return new MDCExpansionPanel(root);
  }

  /**
   * Checks whether the root element has the expanded class.
   * @return {boolean}
   */
  get expanded() {
    return this.foundation_.expanded;
  }

  /**
   * Expands the panel.
   */
  expand() {
    this.foundation_.expand();
  }

  /**
   * Collapses the panel.
   */
  collapse() {
    this.foundation_.collapse();
  }

  /**
   * @return {!MDCExpansionPanelFoundation}
   */
  getDefaultFoundation() {
    return new MDCExpansionPanelFoundation({
      blur: () => this.root_.blur(),
      hasClass: className => this.root_.classList.contains(className),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      setAttribute: (attributeName, value) =>
        this.root_.setAttribute(attributeName, value),
      registerInteractionHandler: (type, handler) =>
        this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) =>
        this.root_.removeEventListener(type, handler),
      notifyChange: () => this.emit(strings.CHANGE_EVENT, this),
      notifyExpand: () => this.emit(strings.EXPAND_EVENT, this),
      notifyCollapse: () => this.emit(strings.COLLAPSE_EVENT, this),
      setStyle: (styleName, value) => (this.root_.style[styleName] = value),
      getStyle: styleName => this.root_.style[styleName],
      getComputedHeight: () => getComputedStyle(this.root_).height,
      offsetHeight: () => this.root_.offsetHeight,
      shouldRespondToClickEvent: event =>
        !event.target.classList.contains(cssClasses.NO_CLICK)
    });
  }
}

export {
  MDCExpansionPanel,
  MDCExpansionPanelFoundation,
  MDCExpansionPanelAccordion,
  MDCExpansionPanelAccordionFoundation,
  util
};

export { default as ExpansionPanel } from './ExpansionPanel';
export { default as ExpansionPanelBody } from './ExpansionPanelBody';
export { default as ExpansionPanelHeader } from './ExpansionPanelHeader';
export {
  default as ExpansionPanelHeaderSection
} from './ExpansionPanelHeaderSection';
export { default as ExpansionPanelIcon } from './ExpansionPanelIcon';
export { default as ExpansionPanelText } from './ExpansionPanelText';
