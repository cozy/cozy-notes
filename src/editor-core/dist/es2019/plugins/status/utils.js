import { NodeSelection, Selection } from 'prosemirror-state';
export const mayGetStatusAtSelection = selection => {
  if (selection && selection instanceof NodeSelection) {
    const nodeSelection = selection;

    if (nodeSelection.node.type.name === 'status') {
      return selection.node.attrs || null;
    }
  }

  return null;
};
export const mayGetStatusAtPos = (pos, doc) => {
  if (pos) {
    const node = doc.nodeAt(pos);

    if (node && node.type.name === 'status') {
      return node.attrs;
    }
  }

  return null;
};
export const isEmptyStatus = node => node && (node.text && node.text.trim().length === 0 || node.text === '');
export const setSelectionNearPos = (tr, pos) => tr.setSelection(Selection.near(tr.doc.resolve(tr.mapping.map(pos))));
export const setNodeSelectionNearPos = (tr, pos) => tr.setSelection(NodeSelection.create(tr.doc, tr.mapping.map(pos)));