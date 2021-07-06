import { MobileScrollActionTypes } from './actions'
export default function(state, action) {
  switch (action.type) {
    case MobileScrollActionTypes.SET_KEYBOARD_HEIGHT:
      return { ...state, keyboardHeight: action.keyboardHeight }

    case MobileScrollActionTypes.SET_HEIGHT_DIFF:
      return { ...state, heightDiff: action.heightDiff }

    case MobileScrollActionTypes.SET_WINDOW_HEIGHT:
      return { ...state, windowHeight: action.windowHeight }

    case MobileScrollActionTypes.SET_MOBILE_PADDING_TOP:
      return { ...state, mobilePaddingTop: action.paddingTop }
  }

  return state
}
