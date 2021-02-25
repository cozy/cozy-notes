import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { findTable } from '@atlaskit/editor-tables/utils';
import { DecorationSet } from 'prosemirror-view';
import { TableDecorations } from '../../../types';
import { createColumnControlsDecoration, createColumnSelectedDecoration, findColumnControlSelectedDecoration, findControlsHoverDecoration, updateDecorations } from '../../../utils/decoration';
import { composeDecorations } from './compose-decorations';

const isColumnSelected = tr => tr.selection instanceof CellSelection && tr.selection.isColSelection(); // @see: https://product-fabric.atlassian.net/browse/ED-3796


const removeControlsHoverDecoration = ({
  decorationSet
}) => decorationSet.remove(findControlsHoverDecoration(decorationSet));

const maybeUpdateColumnSelectedDecoration = ({
  decorationSet,
  tr
}) => {
  if (!isColumnSelected(tr)) {
    return decorationSet;
  }

  return updateDecorations(tr.doc, decorationSet, createColumnSelectedDecoration(tr), TableDecorations.COLUMN_SELECTED);
};

const maybeUpdateColumnControlsDecoration = ({
  decorationSet,
  tr
}) => {
  const table = findTable(tr.selection);

  if (!table) {
    return decorationSet;
  }

  return updateDecorations(tr.doc, decorationSet, createColumnControlsDecoration(tr.selection), TableDecorations.COLUMN_CONTROLS_DECORATIONS);
}; // @see: https://product-fabric.atlassian.net/browse/ED-7304


const removeColumnControlsSelectedDecoration = ({
  decorationSet
}) => decorationSet.remove(findColumnControlSelectedDecoration(decorationSet));

const hasColumnSelectedDecorations = decorationSet => !!findColumnControlSelectedDecoration(decorationSet).length;

export const maybeUpdateColumnControlsSelectedDecoration = ({
  decorationSet,
  tr
}) => {
  if (!hasColumnSelectedDecorations(decorationSet)) {
    return decorationSet;
  }

  return removeColumnControlsSelectedDecoration({
    decorationSet,
    tr
  });
};
export const buildColumnControlsDecorations = ({
  decorationSet,
  tr
}) => {
  return composeDecorations([removeColumnControlsSelectedDecoration, removeControlsHoverDecoration, maybeUpdateColumnSelectedDecoration, maybeUpdateColumnControlsDecoration])({
    decorationSet: DecorationSet.empty,
    tr
  });
};