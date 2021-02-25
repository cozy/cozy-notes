const getCursorHeightFrom = node => parseFloat(window.getComputedStyle(node, undefined).lineHeight || '');

export const getOffsetParent = (editorViewDom, popupsMountPoint) => popupsMountPoint ? popupsMountPoint.offsetParent : editorViewDom.offsetParent;
export const getNearestNonTextNode = node => node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
/**
 * We need to translate the co-ordinates because `coordsAtPos` returns co-ordinates
 * relative to `window`. And, also need to adjust the cursor container height.
 * (0, 0)
 * +--------------------- [window] ---------------------+
 * |   (left, top) +-------- [Offset Parent] --------+  |
 * | {coordsAtPos} | [Cursor]   <- cursorHeight      |  |
 * |               | [FloatingToolbar]               |  |
 */

const convertFixedCoordinatesToAbsolutePositioning = (coordinates, offsetParent, cursorHeight) => {
  const {
    left: offsetParentLeft,
    top: offsetParentTop,
    height: offsetParentHeight
  } = offsetParent.getBoundingClientRect();
  return {
    left: coordinates.left - offsetParentLeft,
    right: coordinates.right - offsetParentLeft,
    top: coordinates.top - (offsetParentTop - cursorHeight) + offsetParent.scrollTop,
    bottom: offsetParentHeight - (coordinates.top - (offsetParentTop - cursorHeight) - offsetParent.scrollTop)
  };
};

export const handlePositionCalculatedWith = (offsetParent, node, getCurrentFixedCoordinates) => position => {
  if (!offsetParent) {
    return position;
  }

  const target = getNearestNonTextNode(node);
  const cursorHeight = getCursorHeightFrom(target);
  const fixedCoordinates = getCurrentFixedCoordinates();
  const absoluteCoordinates = convertFixedCoordinatesToAbsolutePositioning(fixedCoordinates, offsetParent, cursorHeight);
  return {
    left: position.left ? absoluteCoordinates.left : undefined,
    right: position.right ? absoluteCoordinates.right : undefined,
    top: position.top ? absoluteCoordinates.top : undefined,
    bottom: position.bottom ? absoluteCoordinates.bottom : undefined
  };
};