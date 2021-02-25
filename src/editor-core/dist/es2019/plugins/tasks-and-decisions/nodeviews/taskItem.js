import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ReactNodeView } from '../../../nodeviews';
import WithPluginState from '../../../ui/WithPluginState';
import { stateKey as taskPluginKey } from '../pm-plugins/plugin-key';
import TaskItem from '../ui/Task';

class Task extends ReactNodeView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleOnChange", (taskId, isChecked) => {
      const {
        tr
      } = this.view.state;
      const nodePos = this.getPos();
      tr.setNodeMarkup(nodePos, undefined, {
        state: isChecked ? 'DONE' : 'TODO',
        localId: taskId
      });
      this.view.dispatch(tr);
    });

    _defineProperty(this, "addListAnalyticsData", event => {
      try {
        const resolvedPos = this.view.state.doc.resolve(this.getPos());
        const position = resolvedPos.index();
        const listSize = resolvedPos.parent.childCount;
        const listLocalId = resolvedPos.parent.attrs.localId;
        event.update(payload => {
          const {
            attributes = {},
            actionSubject
          } = payload;

          if (actionSubject !== 'action') {
            // Not action related, ignore
            return payload;
          }

          return { ...payload,
            attributes: { ...attributes,
              position,
              listSize,
              listLocalId
            }
          };
        });
      } catch (e) {// This can occur if pos is NaN (seen it in some test cases)
        // Act defensively here, and lose some analytics data rather than
        // cause any user facing error.
      }
    });
  }

  isContentEmpty(node) {
    return node.content.childCount === 0;
  }

  createDomRef() {
    const domRef = document.createElement('div');
    domRef.style['list-style-type'] = 'none';
    return domRef;
  }

  getContentDOM() {
    const dom = document.createElement('div'); // setting a className prevents PM/Chrome mutation observer from
    // incorrectly deleting nodes

    dom.className = 'task-item';
    return {
      dom
    };
  }

  render(props, forwardRef) {
    const {
      localId,
      state
    } = this.node.attrs;
    return /*#__PURE__*/React.createElement(AnalyticsListener, {
      channel: "fabric-elements",
      onEvent: this.addListAnalyticsData
    }, /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        taskDecisionPlugin: taskPluginKey
      },
      render: () => {
        return /*#__PURE__*/React.createElement(TaskItem, {
          taskId: localId,
          contentRef: forwardRef,
          isDone: state === 'DONE',
          onChange: this.handleOnChange,
          showPlaceholder: this.isContentEmpty(this.node),
          providers: props.providerFactory
        });
      }
    }));
  }

  viewShouldUpdate(nextNode) {
    /**
     * To ensure the placeholder is correctly toggled we need to allow react to re-render
     * on first character insertion.
     * Note: last character deletion is handled externally and automatically re-renders.
     */
    return this.isContentEmpty(this.node) && !!nextNode.content.childCount;
  }

  update(node, decorations) {
    return super.update(node, decorations, (currentNode, newNode) => // Toggle the placeholder based on whether user input exists
    !this.isContentEmpty(newNode) && !!(currentNode.attrs.state === newNode.attrs.state));
  }

}

export function taskItemNodeViewFactory(portalProviderAPI, eventDispatcher, providerFactory) {
  return (node, view, getPos) => {
    return new Task(node, view, getPos, portalProviderAPI, eventDispatcher, {
      providerFactory
    }).init();
  };
}