import { HistoryActionTypes } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case HistoryActionTypes.UPDATE:
      return {
        canUndo: action.canUndo,
        canRedo: action.canRedo
      };
  }

  return state;
};

export default reducer;