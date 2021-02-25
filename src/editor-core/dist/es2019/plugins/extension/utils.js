import { findParentNodeOfType, findSelectedNodeOfType, findDomRefAtPos } from 'prosemirror-utils';
import { closestElement } from '../../utils/dom';
export const getSelectedExtension = (state, searchParent = false) => {
  const {
    inlineExtension,
    extension,
    bodiedExtension
  } = state.schema.nodes;
  const nodeTypes = [extension, bodiedExtension, inlineExtension];
  return findSelectedNodeOfType(nodeTypes)(state.selection) || searchParent && findParentNodeOfType(nodeTypes)(state.selection) || undefined;
};
export const getSelectedNonContentExtension = ({
  schema,
  selection
}) => {
  const {
    inlineExtension,
    extension
  } = schema.nodes;
  return findSelectedNodeOfType([inlineExtension, extension])(selection);
};
export const getSelectedDomElement = (domAtPos, selectedExtensionNode, isContentExtension = false) => {
  const selectedExtensionDomNode = selectedExtensionNode && findDomRefAtPos(selectedExtensionNode.pos, domAtPos); // Non-content extension can be nested in bodied-extension, the following check is necessary for that case

  return selectedExtensionNode && selectedExtensionDomNode.querySelector ? isContentExtension ? selectedExtensionDomNode.querySelector('.extension-container') || selectedExtensionDomNode : closestElement(selectedExtensionDomNode, '.extension-container') || selectedExtensionDomNode.querySelector('.extension-container') || selectedExtensionDomNode : undefined;
};