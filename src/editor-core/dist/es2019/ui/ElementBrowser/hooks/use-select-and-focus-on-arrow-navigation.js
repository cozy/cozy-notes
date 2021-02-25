import { useCallback, useEffect, useRef, useReducer } from 'react';
/**
 * a custom hook that handles keyboard navigation for Arrow keys based on a
 * given listSize, and a step (for up and down arrows).
 *
 * @param {number} listSize
 * @param {number} upDownStep
 *
 * Example usage:
 *    const list = ['Confluence','Jira','Atlaskit'];
 *    const {
 *      selectedItemIndex,
 *      focusedItemIndex,
 *      focusOnSearch,
 *      setFocusedItemIndex,
 *      onKeyDown
 *    } = useSelectAndFocusOnArrowNavigation(list.length - 1, 1);
 *
 *    return (
 *      <div onKeyDown={onKeyDown}>
 *        <SearchBar onClick={() => setFocusedItemIndex(undefined)} focus={focusOnSearch} />
 *        {list.map((item, index) => (
 *           <ListItem
 *            title={item}
 *            style={{ ..., color: selected ? 'selectedStateColor' : defaultColor }}
 *            onClick={() => {
 *              setFocusedItemIndex(index);
 *            }
 *          />
 *        )}
 *      </div>
 *    );
 *
 *    const SearchBar = ({ focus }) => {
 *      const ref = useRefToFocusOrScroll(focus);
 *      return <input ref={ref} />
 *    }
 *
 */

export let ACTIONS;

(function (ACTIONS) {
  ACTIONS["FOCUS_SEARCH"] = "focusOnSearch";
  ACTIONS["UPDATE_STATE"] = "updateState";
  ACTIONS["MOVE"] = "move";
})(ACTIONS || (ACTIONS = {}));

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_STATE:
      return { ...state,
        ...action.payload
      };

    case ACTIONS.FOCUS_SEARCH:
      return { ...state,
        focusedItemIndex: undefined,
        focusOnSearch: true
      };

    case ACTIONS.MOVE:
      return moveReducer(state, action);
  }

  return state;
};

const moveReducer = (state, action) => {
  const newIndex = state.selectedItemIndex + action.payload.positions; // The step payload is only sent for up arrow.
  // When user presses up arrow on first row, focus on search bar.

  if (action.payload.step && state.selectedItemIndex < action.payload.step) {
    return { ...state,
      focusOnSearch: true,
      focusedItemIndex: undefined
    };
  }

  if (newIndex < 0) {
    return state;
  } // Set focus position to first item when moving forward or backward from searchbar


  if (state.focusedItemIndex == null || state.focusOnSearch) {
    return { ...state,
      focusOnSearch: false,
      focusedItemIndex: 0,
      selectedItemIndex: 0
    };
  }

  const safeIndex = ensureSafeIndex(newIndex, state.listSize);
  return { ...state,
    focusedItemIndex: safeIndex,
    selectedItemIndex: safeIndex
  };
};

const initialState = {
  focusOnSearch: true,
  selectedItemIndex: 0,
  focusedItemIndex: undefined,
  listSize: 0
};

const getInitialState = listSize => initialState => ({ ...initialState,
  listSize
});

function useSelectAndFocusOnArrowNavigation(listSize, step) {
  const [state, dispatch] = useReducer(reducer, initialState, getInitialState(listSize));
  const {
    selectedItemIndex,
    focusedItemIndex,
    focusOnSearch
  } = state;
  const reset = useCallback(listSize => {
    let payload = { ...initialState,
      listSize
    };
    dispatch({
      type: ACTIONS.UPDATE_STATE,
      payload
    });
  }, []);
  const removeFocusFromSearchAndSetOnItem = useCallback(index => {
    const payload = {
      focusedItemIndex: index,
      selectedItemIndex: index,
      focusOnSearch: false
    };
    dispatch({
      type: ACTIONS.UPDATE_STATE,
      payload
    });
  }, [dispatch]);
  const setFocusOnSearch = useCallback(() => {
    dispatch({
      type: ACTIONS.FOCUS_SEARCH,
      payload: {}
    });
  }, [dispatch]);
  const isMoving = useRef(false);
  const move = useCallback((e, positions, actualStep) => {
    e.preventDefault();
    e.stopPropagation(); // avoid firing 2 moves at the same time when holding an arrow down as this can freeze the screen

    if (!isMoving.current) {
      isMoving.current = true;
      requestAnimationFrame(() => {
        isMoving.current = false;
        dispatch({
          type: ACTIONS.MOVE,
          payload: {
            positions,
            step: actualStep
          }
        });
      });
    }
  }, []);
  const onKeyDown = useCallback(e => {
    const avoidKeysWhileSearching = ['/', // While already focused on search bar, let users type in.
    'ArrowRight', 'ArrowLeft', 'ArrowUp'];

    if (focusOnSearch && avoidKeysWhileSearching.includes(e.key)) {
      return;
    }

    switch (e.key) {
      case '/':
        e.preventDefault();
        e.stopPropagation();
        return setFocusOnSearch();

      case 'ArrowRight':
        return move(e, +1);

      case 'ArrowLeft':
        return move(e, -1);

      case 'ArrowDown':
        return move(e, +step);

      case 'ArrowUp':
        return move(e, -step, step);
    }
  }, [focusOnSearch, setFocusOnSearch, move, step]);
  useEffect(() => {
    // To reset selection when user filters
    reset(listSize);
  }, [listSize, reset]);
  return {
    selectedItemIndex,
    onKeyDown,
    focusOnSearch,
    setFocusOnSearch,
    focusedItemIndex,
    setFocusedItemIndex: removeFocusFromSearchAndSetOnItem
  };
}

export const ensureSafeIndex = (index, listSize) => {
  if (index < 0) {
    return 0;
  }

  if (index > listSize) {
    return listSize;
  }

  return index;
};
export default useSelectAndFocusOnArrowNavigation;