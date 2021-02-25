import { DOMSerializer } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
export class PlaceholderTextNodeView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    const serializer = DOMSerializer.fromSchema(this.view.state.schema);
    this.dom = serializer.serializeNode(this.node);
  }

  ignoreMutation(record) {
    // 😬
    // DOM Node needs to be contenteditable so Android does
    // not close its virtual keyboard, see ED-9613
    // To reestablish desired behaviour we replace the placeholdeer
    // when we detect a characterData mutation inside
    const {
      view,
      dom,
      node
    } = this;
    const content = dom.textContent || '';
    const text = node.attrs.text;

    if (record.type === 'characterData' && content !== text && content.includes(text) && typeof this.getPos === 'function') {
      const start = this.getPos();
      const end = start + this.node.nodeSize;
      const stripped = content.replace(text, '');
      let tr = view.state.tr.replaceRangeWith(start, end, view.state.schema.text(stripped));
      tr = tr.setSelection(TextSelection.create(tr.doc, end, end));
      view.dispatch(tr);
    }

    return record.type !== 'selection';
  }

}