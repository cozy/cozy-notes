import { findParentNodeOfType } from 'prosemirror-utils';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
export const getActiveAlignment = state => {
  if (state.selection instanceof CellSelection) {
    const marks = [];
    state.selection.forEachCell(cell => {
      const mark = cell.firstChild.marks.filter(mark => mark.type === state.schema.marks.alignment)[0];
      marks.push(mark ? mark.attrs.align : 'start');
    });
    return marks.every(mark => mark === marks[0]) ? marks[0] : 'start';
  }

  const node = findParentNodeOfType([state.schema.nodes.paragraph, state.schema.nodes.heading])(state.selection);
  const getMark = node && node.node.marks.filter(mark => mark.type === state.schema.marks.alignment)[0];
  return getMark && getMark.attrs.align || 'start';
};