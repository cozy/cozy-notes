import { Plugin } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { fakeCursorForToolbarPluginKey } from './fake-curor-for-toolbar-plugin-key';
import { InsertStatus, stateKey as hyperlinkStateKey } from './main';

const createTextCursor = pos => {
  const node = document.createElement('div');
  node.className = 'ProseMirror-fake-text-cursor';
  return Decoration.widget(pos, node, {
    key: 'hyperlink-text-cursor'
  });
};

const createTextSelection = (from, to) => Decoration.inline(from, to, {
  class: 'ProseMirror-fake-text-selection'
});

const getInsertLinkToolbarState = editorState => {
  const state = hyperlinkStateKey.getState(editorState);

  if (state && state.activeLinkMark) {
    if (state.activeLinkMark.type === InsertStatus.INSERT_LINK_TOOLBAR) {
      return state.activeLinkMark;
    }
  }

  return undefined;
};

const fakeCursorToolbarPlugin = new Plugin({
  key: fakeCursorForToolbarPluginKey,
  state: {
    init() {
      return DecorationSet.empty;
    },

    apply(tr, pluginState, oldState, newState) {
      const oldInsertToolbarState = getInsertLinkToolbarState(oldState);
      const insertToolbarState = getInsertLinkToolbarState(newState); // Map DecorationSet if it still refers to the same position in the document

      if (oldInsertToolbarState && insertToolbarState) {
        const {
          from,
          to
        } = insertToolbarState;
        const oldFrom = tr.mapping.map(oldInsertToolbarState.from);
        const oldTo = tr.mapping.map(oldInsertToolbarState.to);

        if (oldFrom === from && oldTo === to) {
          return pluginState.map(tr.mapping, tr.doc);
        }
      } // Update DecorationSet if new insert toolbar, or if we have moved to a different position in the doc


      if (insertToolbarState) {
        const {
          from,
          to
        } = insertToolbarState;
        return DecorationSet.create(tr.doc, [from === to ? createTextCursor(from) : createTextSelection(from, to)]);
      }

      return DecorationSet.empty;
    }

  },
  props: {
    decorations(state) {
      return fakeCursorForToolbarPluginKey.getState(state);
    }

  }
});
export default fakeCursorToolbarPlugin;