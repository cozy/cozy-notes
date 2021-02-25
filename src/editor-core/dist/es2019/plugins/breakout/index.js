import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { Plugin } from 'prosemirror-state';
import { breakout } from '@atlaskit/adf-schema';
import { calcBreakoutWidth } from '@atlaskit/editor-common';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../width';
import LayoutButton from './ui/LayoutButton';
import { BreakoutCssClassName } from './constants';
import { pluginKey } from './plugin-key';
import { parsePx } from '../../utils/dom';
import { findSupportedNodeForBreakout } from './utils/find-breakout-node';

class BreakoutView {
  constructor(node, view, eventDispatcher) {
    _defineProperty(this, "updateWidth", widthState => {
      const width = calcBreakoutWidth(this.node.attrs.mode, widthState.width);
      let newStyle = `width: ${width}; `;
      const lineLength = widthState.lineLength;
      const widthPx = parsePx(width);

      if (lineLength && widthPx) {
        const marginLeftPx = -(widthPx - lineLength) / 2;
        newStyle += `transform: none; margin-left: ${marginLeftPx}px;`;
      } else {
        // fallback method
        // (lineLength is not normally undefined, but might be in e.g. SSR or initial render)
        //
        // this approach doesn't work well with position: fixed, so
        // it breaks things like sticky headers
        newStyle += `transform: translateX(-50%); margin-left: 50%;`;
      } // NOTE: This is a hack to ignore mutation since mark NodeView doesn't support
      // `ignoreMutation` life-cycle event. @see ED-9947


      const viewDomObserver = this.view.domObserver;

      if (viewDomObserver && this.view.dom) {
        viewDomObserver.stop();
        setTimeout(() => {
          viewDomObserver.start();
        }, 0);
      }

      if (typeof this.dom.style.cssText !== 'undefined') {
        this.dom.style.cssText = newStyle;
      } else {
        this.dom.setAttribute('style', newStyle);
      }
    });

    const contentDOM = document.createElement('div');
    contentDOM.className = BreakoutCssClassName.BREAKOUT_MARK_DOM;
    const dom = document.createElement('div');
    dom.className = BreakoutCssClassName.BREAKOUT_MARK;
    dom.setAttribute('data-layout', node.attrs.mode);
    dom.appendChild(contentDOM);
    this.dom = dom;
    this.node = node;
    this.view = view;
    this.contentDOM = contentDOM;
    this.eventDispatcher = eventDispatcher;
    eventDispatcher.on(widthPluginKey.key, this.updateWidth);
    this.updateWidth(widthPluginKey.getState(this.view.state));
  }

  // NOTE: Lifecycle events doesn't work for mark NodeView. So currently this is a no-op.
  // @see https://github.com/ProseMirror/prosemirror/issues/1082
  destroy() {
    this.eventDispatcher.off(widthPluginKey.key, this.updateWidth);
  }

}

function shouldPluginStateUpdate(newBreakoutNode, currentBreakoutNode) {
  if (newBreakoutNode && currentBreakoutNode) {
    return !newBreakoutNode.eq(currentBreakoutNode);
  }

  return newBreakoutNode || currentBreakoutNode ? true : false;
}

function createPlugin({
  dispatch,
  eventDispatcher
}) {
  return new Plugin({
    state: {
      init() {
        return {
          breakoutNode: null
        };
      },

      apply(tr, pluginState) {
        const breakoutNode = findSupportedNodeForBreakout(tr.selection);
        const node = breakoutNode ? breakoutNode.node : null;

        if (shouldPluginStateUpdate(node, pluginState.breakoutNode)) {
          const nextPluginState = { ...pluginState,
            breakoutNode: node
          };
          dispatch(pluginKey, nextPluginState);
          return nextPluginState;
        }

        return pluginState;
      }

    },
    key: pluginKey,
    props: {
      nodeViews: {
        breakout: (node, view) => {
          return new BreakoutView(node, view, eventDispatcher);
        }
      }
    }
  });
}

const breakoutPlugin = options => ({
  name: 'breakout',

  pmPlugins() {
    return [{
      name: 'breakout',
      plugin: createPlugin
    }];
  },

  marks() {
    return [{
      name: 'breakout',
      mark: breakout
    }];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement
  }) {
    // This is a bit crappy, but should be resolved once we move to a static schema.
    if (options && !options.allowBreakoutButton) {
      return null;
    }

    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        pluginState: pluginKey
      },
      render: ({
        pluginState
      }) => /*#__PURE__*/React.createElement(LayoutButton, {
        editorView: editorView,
        mountPoint: popupsMountPoint,
        boundariesElement: popupsBoundariesElement,
        scrollableElement: popupsScrollableElement,
        node: pluginState.breakoutNode
      })
    });
  }

});

export default breakoutPlugin;