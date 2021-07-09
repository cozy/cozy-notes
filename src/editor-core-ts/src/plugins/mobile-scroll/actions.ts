export enum MobileScrollActionTypes {
  SET_KEYBOARD_HEIGHT = 'SET_KEYBOARD_HEIGHT',
  SET_HEIGHT_DIFF = 'SET_HEIGHT_DIFF',
  SET_WINDOW_HEIGHT = 'SET_WINDOW_HEIGHT',
  SET_MOBILE_PADDING_TOP = 'SET_MOBILE_PADDING_TOP',
}

export interface SetMobilePaddingTop {
  type: MobileScrollActionTypes.SET_MOBILE_PADDING_TOP;
  paddingTop: number;
}
export interface SetKeyboardHeight {
  type: MobileScrollActionTypes.SET_KEYBOARD_HEIGHT;
  keyboardHeight: number;
}

export interface SetHeightDiff {
  type: MobileScrollActionTypes.SET_HEIGHT_DIFF;
  heightDiff: number;
}

export interface SetWindowHeight {
  type: MobileScrollActionTypes.SET_WINDOW_HEIGHT;
  windowHeight: number;
}

export type MobileScrollAction =
  | SetKeyboardHeight
  | SetHeightDiff
  | SetWindowHeight
  | SetMobilePaddingTop;
