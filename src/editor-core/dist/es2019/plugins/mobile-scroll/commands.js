import { MobileScrollActionTypes } from './actions';
import { createCommand } from './plugin-factory';
export const setKeyboardHeight = keyboardHeight => createCommand({
  type: MobileScrollActionTypes.SET_KEYBOARD_HEIGHT,
  keyboardHeight
});
export const setHeightDiff = heightDiff => createCommand({
  type: MobileScrollActionTypes.SET_HEIGHT_DIFF,
  heightDiff
});
export const setWindowHeight = windowHeight => createCommand({
  type: MobileScrollActionTypes.SET_WINDOW_HEIGHT,
  windowHeight
});
export const setMobilePaddingTop = paddingTop => createCommand({
  type: MobileScrollActionTypes.SET_MOBILE_PADDING_TOP,
  paddingTop
});