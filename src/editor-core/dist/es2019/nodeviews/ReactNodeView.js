import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { startMeasure, stopMeasure } from '@atlaskit/editor-common';
import { analyticsPluginKey } from '../plugins/analytics/plugin-key';
import { createDispatch } from '../event-dispatcher';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../plugins/analytics';
import { analyticsEventKey } from '../plugins/analytics/consts';
import { getParticipantsCount } from '../plugins/collab-edit/get-participants-count';
const DEFAULT_SAMPLING_RATE = 100;
const DEFAULT_SLOW_THRESHOLD = 7;
let nodeViewEventsCounter = 0;
export default class ReactNodeView {
  constructor(_node, view, getPos, portalProviderAPI, eventDispatcher, reactComponentProps, reactComponent, hasContext = false, viewShouldUpdate) {
    _defineProperty(this, "handleRef", node => this._handleRef(node));

    _defineProperty(this, "dispatchAnalyticsEvent", payload => {
      if (this.eventDispatcher && this.performanceOptions.enabled) {
        const dispatch = createDispatch(this.eventDispatcher);
        dispatch(analyticsEventKey, {
          payload
        });
      }
    });

    this.node = _node;
    this.view = view;
    this.getPos = getPos;
    this.portalProviderAPI = portalProviderAPI;
    this.reactComponentProps = reactComponentProps || {};
    this.reactComponent = reactComponent;
    this.hasContext = hasContext;
    this._viewShouldUpdate = viewShouldUpdate;
    this.eventDispatcher = eventDispatcher;
  }
  /**
   * This method exists to move initialization logic out of the constructor,
   * so object can be initialized properly before calling render first time.
   *
   * Example:
   * Instance properties get added to an object only after super call in
   * constructor, which leads to some methods being undefined during the
   * first render.
   */


  init() {
    this.domRef = this.createDomRef();
    this.setDomAttrs(this.node, this.domRef);
    const {
      dom: contentDOMWrapper,
      contentDOM
    } = this.getContentDOM() || {
      dom: undefined,
      contentDOM: undefined
    };

    if (this.domRef && contentDOMWrapper) {
      this.domRef.appendChild(contentDOMWrapper);
      this.contentDOM = contentDOM ? contentDOM : contentDOMWrapper;
      this.contentDOMWrapper = contentDOMWrapper || contentDOM;
    } // @see ED-3790
    // something gets messed up during mutation processing inside of a
    // nodeView if DOM structure has nested plain "div"s, it doesn't see the
    // difference between them and it kills the nodeView


    this.domRef.classList.add(`${this.node.type.name}View-content-wrap`);
    const {
      samplingRate,
      slowThreshold,
      enabled: trackingEnabled
    } = this.performanceOptions;
    trackingEnabled && startMeasure(`🦉${this.node.type.name}::ReactNodeView`);
    this.renderReactComponent(() => this.render(this.reactComponentProps, this.handleRef));
    trackingEnabled && stopMeasure(`🦉${this.node.type.name}::ReactNodeView`, duration => {
      if (++nodeViewEventsCounter % samplingRate === 0 && duration > slowThreshold) {
        this.dispatchAnalyticsEvent({
          action: ACTION.REACT_NODEVIEW_RENDERED,
          actionSubject: ACTION_SUBJECT.EDITOR,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes: {
            node: this.node.type.name,
            duration,
            participants: getParticipantsCount(this.view.state)
          }
        });
      }
    });
    return this;
  }

  renderReactComponent(component) {
    if (!this.domRef || !component) {
      return;
    }

    this.portalProviderAPI.render(component, this.domRef, this.hasContext);
  }

  createDomRef() {
    return this.node.isInline ? document.createElement('span') : document.createElement('div');
  }

  getContentDOM() {
    return undefined;
  }

  _handleRef(node) {
    const contentDOM = this.contentDOMWrapper || this.contentDOM; // move the contentDOM node inside the inner reference after rendering

    if (node && contentDOM && !node.contains(contentDOM)) {
      node.appendChild(contentDOM);
    }
  }

  render(props, forwardRef) {
    return this.reactComponent ? /*#__PURE__*/React.createElement(this.reactComponent, _extends({
      view: this.view,
      getPos: this.getPos,
      node: this.node,
      forwardRef: forwardRef
    }, props)) : null;
  }

  update(node, _decorations, validUpdate = () => true) {
    // @see https://github.com/ProseMirror/prosemirror/issues/648
    const isValidUpdate = this.node.type === node.type && validUpdate(this.node, node);

    if (!isValidUpdate) {
      return false;
    }

    if (this.domRef && !this.node.sameMarkup(node)) {
      this.setDomAttrs(node, this.domRef);
    } // View should not process a re-render if this is false.
    // We dont want to destroy the view, so we return true.


    if (!this.viewShouldUpdate(node)) {
      this.node = node;
      return true;
    }

    this.node = node;
    this.renderReactComponent(() => this.render(this.reactComponentProps, this.handleRef));
    return true;
  }

  viewShouldUpdate(nextNode) {
    if (this._viewShouldUpdate) {
      return this._viewShouldUpdate(nextNode);
    }

    return true;
  }
  /**
   * Copies the attributes from a ProseMirror Node to a DOM node.
   * @param node The Prosemirror Node from which to source the attributes
   */


  setDomAttrs(node, element) {
    Object.keys(node.attrs || {}).forEach(attr => {
      element.setAttribute(attr, node.attrs[attr]);
    });
  }

  get dom() {
    return this.domRef;
  }

  destroy() {
    if (!this.domRef) {
      return;
    }

    this.portalProviderAPI.remove(this.domRef);
    this.domRef = undefined;
    this.contentDOM = undefined;
  }

  get performanceOptions() {
    const pluginState = analyticsPluginKey.getState(this.view.state);
    const nodeViewTracking = pluginState && pluginState.performanceTracking ? pluginState.performanceTracking.nodeViewTracking || {} : {};
    const samplingRate = nodeViewTracking.samplingRate || DEFAULT_SAMPLING_RATE;
    const slowThreshold = nodeViewTracking.slowThreshold || DEFAULT_SLOW_THRESHOLD;
    return {
      enabled: !!nodeViewTracking.enabled,
      samplingRate,
      slowThreshold
    };
  }

  static fromComponent(component, portalProviderAPI, eventDispatcher, props, viewShouldUpdate) {
    return (node, view, getPos) => new ReactNodeView(node, view, getPos, portalProviderAPI, eventDispatcher, props, component, false, viewShouldUpdate).init();
  }

}