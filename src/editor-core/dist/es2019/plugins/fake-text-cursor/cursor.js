import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { TextSelection, Selection } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Slice } from 'prosemirror-model';
export class FakeTextCursorBookmark {
  constructor(pos) {
    _defineProperty(this, "pos", undefined);

    _defineProperty(this, "visible", false);

    this.pos = pos;
  }

  map(mapping) {
    return new FakeTextCursorBookmark(mapping.map(this.pos));
  }

  resolve(doc) {
    const $pos = doc.resolve(this.pos);
    return Selection.near($pos);
  }

}
export class FakeTextCursorSelection extends Selection {
  constructor($pos) {
    super($pos, $pos);
  }

  map(doc, mapping) {
    const $pos = doc.resolve(mapping.map(this.$head.pos));
    return new FakeTextCursorSelection($pos);
  }

  static content() {
    return Slice.empty;
  }

  eq(other) {
    return other instanceof FakeTextCursorSelection && other.head === this.head;
  }

  toJSON() {
    return {
      type: 'Cursor',
      pos: this.head
    };
  }

  static fromJSON(doc, json) {
    return new FakeTextCursorSelection(doc.resolve(json.pos));
  }

  getBookmark() {
    return new FakeTextCursorBookmark(this.anchor);
  }

}
Selection.jsonID('fake-text-cursor', FakeTextCursorSelection);
export const addFakeTextCursor = (state, dispatch) => {
  const {
    selection
  } = state;

  if (selection.empty) {
    const {
      selection: {
        $from
      }
    } = state;
    dispatch(state.tr.setSelection(new FakeTextCursorSelection($from)));
  }
};
export const removeFakeTextCursor = (state, dispatch) => {
  if (state.selection instanceof FakeTextCursorSelection) {
    const {
      $from
    } = state.selection;
    dispatch(state.tr.setSelection(new TextSelection($from)));
  }
};
export const drawFakeTextCursor = state => {
  if (!(state.selection instanceof FakeTextCursorSelection)) {
    return null;
  }

  const node = document.createElement('div');
  node.className = 'ProseMirror-fake-text-cursor';
  return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node, {
    key: 'Cursor'
  })]);
};