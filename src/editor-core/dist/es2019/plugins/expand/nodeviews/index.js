import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import ReactDOM from 'react-dom';
import { Selection, NodeSelection } from 'prosemirror-state';
import { ExpandIconButton } from '../ui/ExpandIconButton';
import { keyName } from 'w3c-keyname';
import { DOMSerializer } from 'prosemirror-model';
import { expandMessages } from '@atlaskit/editor-common';
import { isEmptyNode } from '../../../utils';
import { updateExpandTitle, toggleExpandExpanded, deleteExpandAtPos, setSelectionInsideExpand } from '../commands';
import { expandClassNames } from '../ui/class-names';
import { GapCursorSelection, Side } from '../../../plugins/selection/gap-cursor-selection';
import { getFeatureFlags } from '../../feature-flags-context';
import { closestElement } from '../../../utils/dom';
import { RelativeSelectionPos } from '../../selection/types';
import { setSelectionRelativeToNode } from '../../selection/commands';
import { getPluginState as getSelectionPluginState } from '../../selection/plugin-factory';

function buildExpandClassName(type, expanded) {
  return `${expandClassNames.prefix} ${expandClassNames.type(type)} ${expanded ? expandClassNames.expanded : ''}`;
}

const toDOM = (node, intl) => ['div', {
  // prettier-ignore
  'class': buildExpandClassName(node.type.name, node.attrs.__expanded),
  'data-node-type': node.type.name,
  'data-title': node.attrs.title
}, ['div', {
  // prettier-ignore
  'class': expandClassNames.titleContainer,
  contenteditable: 'false',
  // Element gains access to focus events.
  // This is needed to prevent PM gaining access
  // on interacting with our controls.
  tabindex: '-1'
}, // prettier-ignore
['div', {
  'class': expandClassNames.icon
}], ['div', {
  // prettier-ignore
  'class': expandClassNames.inputContainer
}, ['input', {
  // prettier-ignore
  'class': expandClassNames.titleInput,
  value: node.attrs.title,
  placeholder: intl && intl.formatMessage(expandMessages.expandPlaceholderText) || expandMessages.expandPlaceholderText.defaultMessage,
  type: 'text'
}]]], // prettier-ignore
['div', {
  'class': expandClassNames.content
}, 0]];

export class ExpandNodeView {
  constructor(node, view, getPos, reactContext) {
    _defineProperty(this, "allowInteractiveExpand", true);

    _defineProperty(this, "focusTitle", () => {
      if (this.input) {
        const {
          state,
          dispatch
        } = this.view;
        setSelectionRelativeToNode(RelativeSelectionPos.Start)(state, dispatch);
        setSelectionInsideExpand(state, dispatch, this.view);
        this.input.focus();
      }
    });

    _defineProperty(this, "handleIconKeyDown", event => {
      switch (keyName(event)) {
        case 'Tab':
          event.preventDefault();
          this.focusTitle();
          break;

        case 'Enter':
          event.preventDefault();
          this.handleClick(event);
          break;
      }
    });

    _defineProperty(this, "isAllowInteractiveExpandEnabled", () => {
      const {
        state
      } = this.view;
      const featureFlags = getFeatureFlags(state);
      return featureFlags && !!featureFlags.interactiveExpand;
    });

    _defineProperty(this, "handleClick", event => {
      const target = event.target;
      const {
        state,
        dispatch
      } = this.view;

      if (closestElement(target, `.${expandClassNames.icon}`)) {
        if (!this.isAllowInteractiveExpandEnabled()) {
          return;
        }

        event.stopPropagation(); // We blur the editorView, to prevent any keyboard showing on mobile
        // When we're interacting with the expand toggle

        if (this.view.dom instanceof HTMLElement) {
          this.view.dom.blur();
        }

        toggleExpandExpanded(this.getPos(), this.node.type)(state, dispatch);
        return;
      }

      if (target === this.input) {
        event.stopPropagation();
        this.focusTitle();
        return;
      }
    });

    _defineProperty(this, "handleInput", event => {
      const target = event.target;

      if (target === this.input) {
        event.stopPropagation();
        const {
          state,
          dispatch
        } = this.view;
        updateExpandTitle(target.value, this.getPos(), this.node.type)(state, dispatch);
      }
    });

    _defineProperty(this, "handleFocus", event => {
      event.stopImmediatePropagation();
    });

    _defineProperty(this, "handleTitleKeydown", event => {
      switch (keyName(event)) {
        case 'Enter':
          this.toggleExpand();
          break;

        case 'Tab':
        case 'ArrowDown':
          this.moveToOutsideOfTitle(event);
          break;

        case 'ArrowRight':
          this.handleArrowRightFromTitle(event);
          break;

        case 'ArrowLeft':
          this.handleArrowLeftFromTitle(event);
          break;

        case 'ArrowUp':
          this.setLeftGapCursor(event);
          break;

        case 'Backspace':
          this.deleteExpand(event);
          break;
      }
    });

    _defineProperty(this, "deleteExpand", event => {
      if (!this.input) {
        return;
      }

      const {
        selectionStart,
        selectionEnd
      } = this.input;

      if (selectionStart !== selectionEnd || selectionStart !== 0) {
        return;
      }

      const {
        state
      } = this.view;
      const expandNode = this.node;

      if (expandNode && isEmptyNode(state.schema)(expandNode)) {
        deleteExpandAtPos(this.getPos(), expandNode)(state, this.view.dispatch);
      }
    });

    _defineProperty(this, "toggleExpand", () => {
      if (this.isAllowInteractiveExpandEnabled()) {
        const {
          state,
          dispatch
        } = this.view;
        toggleExpandExpanded(this.getPos(), this.node.type)(state, dispatch);
      }
    });

    _defineProperty(this, "moveToOutsideOfTitle", event => {
      event.preventDefault();
      const {
        state,
        dispatch
      } = this.view;
      const expandPos = this.getPos();

      if (typeof expandPos !== 'number') {
        return;
      }

      let pos = expandPos;

      if (this.isCollapsed()) {
        pos = expandPos + this.node.nodeSize;
      }

      const resolvedPos = state.doc.resolve(pos);

      if (!resolvedPos) {
        return;
      }

      if (this.isCollapsed() && resolvedPos.nodeAfter && ['expand', 'nestedExpand'].indexOf(resolvedPos.nodeAfter.type.name) > -1) {
        return this.setRightGapCursor(event);
      }

      const sel = Selection.findFrom(resolvedPos, 1, true);

      if (sel) {
        // If the input has focus, ProseMirror doesn't
        // Give PM focus back before changing our selection
        this.view.focus();
        dispatch(state.tr.setSelection(sel));
      }
    });

    _defineProperty(this, "isCollapsed", () => {
      return !this.node.attrs.__expanded;
    });

    _defineProperty(this, "setRightGapCursor", event => {
      if (!this.input) {
        return;
      }

      const {
        value,
        selectionStart,
        selectionEnd
      } = this.input;

      if (selectionStart === selectionEnd && selectionStart === value.length) {
        const {
          state,
          dispatch
        } = this.view;
        event.preventDefault();
        this.view.focus();
        dispatch(state.tr.setSelection(new GapCursorSelection(state.doc.resolve(this.node.nodeSize + this.getPos()), Side.RIGHT)));
      }
    });

    _defineProperty(this, "setLeftGapCursor", event => {
      if (!this.input) {
        return;
      }

      const {
        selectionStart,
        selectionEnd
      } = this.input;

      if (selectionStart === selectionEnd && selectionStart === 0) {
        event.preventDefault();
        const {
          state,
          dispatch
        } = this.view;
        this.view.focus();
        dispatch(state.tr.setSelection(new GapCursorSelection(state.doc.resolve(this.getPos()), Side.LEFT)));
      }
    });

    _defineProperty(this, "handleArrowRightFromTitle", event => {
      if (!this.input) {
        return;
      }

      const {
        value,
        selectionStart,
        selectionEnd
      } = this.input;

      if (selectionStart === selectionEnd && selectionStart === value.length) {
        event.preventDefault();
        const {
          state,
          dispatch
        } = this.view;
        this.view.focus();
        setSelectionRelativeToNode(RelativeSelectionPos.End, NodeSelection.create(state.doc, this.getPos()))(state, dispatch);
      }
    });

    _defineProperty(this, "handleArrowLeftFromTitle", event => {
      if (!this.input) {
        return;
      }

      const {
        selectionStart,
        selectionEnd
      } = this.input;

      if (selectionStart === selectionEnd && selectionStart === 0) {
        event.preventDefault();
        const {
          state,
          dispatch
        } = this.view;
        this.view.focus(); // selectionRelativeToNode is undefined when user clicked to select node, then hit left to get focus in title
        // This is a special case where we want to bypass node selection and jump straight to gap cursor

        if (getSelectionPluginState(state).selectionRelativeToNode === undefined) {
          setSelectionRelativeToNode(undefined, new GapCursorSelection(state.doc.resolve(this.getPos()), Side.LEFT))(state, dispatch);
        } else {
          setSelectionRelativeToNode(RelativeSelectionPos.Start, NodeSelection.create(state.doc, this.getPos()))(state, dispatch);
        }
      }
    });

    this.reactContext = reactContext() || {};
    const {
      dom,
      contentDOM
    } = DOMSerializer.renderSpec(document, toDOM(node, this.reactContext.intl));
    this.getPos = getPos;
    this.pos = getPos();
    this.view = view;
    this.node = node;
    this.dom = dom;
    this.contentDOM = contentDOM;
    this.icon = this.dom.querySelector(`.${expandClassNames.icon}`);
    this.input = this.dom.querySelector(`.${expandClassNames.titleInput}`);
    this.titleContainer = this.dom.querySelector(`.${expandClassNames.titleContainer}`);
    this.content = this.dom.querySelector(`.${expandClassNames.content}`);
    this.renderIcon(this.reactContext.intl);
    this.initHandlers();
  }

  initHandlers() {
    if (this.dom) {
      this.dom.addEventListener('click', this.handleClick);
      this.dom.addEventListener('input', this.handleInput);
    }

    if (this.input) {
      this.input.addEventListener('keydown', this.handleTitleKeydown);
    }

    if (this.titleContainer) {
      // If the user interacts in our title bar (either toggle or input)
      // Prevent ProseMirror from getting a focus event (causes weird selection issues).
      this.titleContainer.addEventListener('focus', this.handleFocus);
    }

    if (this.icon) {
      this.icon.addEventListener('keydown', this.handleIconKeyDown);
    }
  }

  renderIcon(intl, node) {
    if (!this.icon) {
      return;
    }

    const {
      __expanded
    } = node && node.attrs || this.node.attrs;
    ReactDOM.render( /*#__PURE__*/React.createElement(ExpandIconButton, {
      allowInteractiveExpand: this.isAllowInteractiveExpandEnabled(),
      expanded: __expanded
    }), this.icon);
  }

  stopEvent(event) {
    const target = event.target;
    return target === this.input || target === this.icon || !!closestElement(target, `.${expandClassNames.icon}`);
  }

  ignoreMutation(mutationRecord) {
    if (mutationRecord.type === 'selection') {
      return false;
    }

    return true;
  }

  update(node, _decorations) {
    if (this.node.type === node.type) {
      if (this.node.attrs.__expanded !== node.attrs.__expanded) {
        // Instead of re-rendering the view on an expand toggle
        // we toggle a class name to hide the content and animate the chevron.
        if (this.dom) {
          this.dom.classList.toggle(expandClassNames.expanded);
          this.renderIcon(this.reactContext && this.reactContext.intl, node);
        }

        if (this.content) {
          // Disallow interaction/selection inside when collapsed.
          this.content.setAttribute('contenteditable', node.attrs.__expanded);
        }
      } // During a collab session the title doesn't sync with other users
      // since we're intentionally being less aggressive about re-rendering.
      // We also apply a rAF to avoid abrupt continuous replacement of the title.


      window.requestAnimationFrame(() => {
        if (this.input && this.node.attrs.title !== this.input.value) {
          this.input.value = this.node.attrs.title;
        }
      });
      this.node = node;
      return true;
    }

    return false;
  }

  destroy() {
    if (this.dom) {
      this.dom.removeEventListener('click', this.handleClick);
      this.dom.removeEventListener('input', this.handleInput);
    }

    if (this.input) {
      this.input.removeEventListener('keydown', this.handleTitleKeydown);
    }

    if (this.titleContainer) {
      this.titleContainer.removeEventListener('focus', this.handleFocus);
    }

    if (this.icon) {
      this.icon.removeEventListener('keydown', this.handleIconKeyDown);
      ReactDOM.unmountComponentAtNode(this.icon);
    }

    this.dom = undefined;
    this.contentDOM = undefined;
    this.icon = undefined;
    this.input = undefined;
    this.titleContainer = undefined;
    this.content = undefined;
  }

}
export default function (reactContext) {
  return (node, view, getPos) => new ExpandNodeView(node, view, getPos, reactContext);
}