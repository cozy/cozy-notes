import React from 'react';
import { AnnotationSharedClassNames } from '@atlaskit/editor-common';
import { ReactNodeView } from '../../../nodeviews';
import WithPluginState from '../../../ui/WithPluginState';
import { inlineCommentPluginKey } from '../utils';
export class AnnotationNodeView extends ReactNodeView {
  createDomRef() {
    return document.createElement('span');
  }

  getContentDOM() {
    const dom = document.createElement('span');
    dom.className = 'ak-editor-annotation';
    return {
      dom
    };
  }

  render(_props, forwardRef) {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        inlineCommentState: inlineCommentPluginKey
      },
      editorView: this.view,
      render: ({
        inlineCommentState
      }) => {
        // Check if selection includes current annotation ID
        const {
          annotations,
          selectedAnnotations,
          isVisible
        } = inlineCommentState;

        if (!isVisible) {
          return /*#__PURE__*/React.createElement("span", {
            ref: forwardRef
          });
        }

        const id = this.node.attrs.id;
        const isUnresolved = annotations[id] === false;
        const annotationHasFocus = selectedAnnotations.some(x => x.id === id);
        const className = getAnnotationViewClassname(isUnresolved, annotationHasFocus);
        return /*#__PURE__*/React.createElement("span", {
          className: className,
          ref: forwardRef
        });
      }
    });
  }

}
export const getAnnotationViewClassname = (isUnresolved, hasFocus) => {
  if (!isUnresolved) {
    return;
  }

  return hasFocus ? AnnotationSharedClassNames.focus : AnnotationSharedClassNames.blur;
};