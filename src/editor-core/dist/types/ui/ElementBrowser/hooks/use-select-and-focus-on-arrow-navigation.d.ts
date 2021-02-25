import React from 'react';
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
declare type ReducerState = {
    focusOnSearch: boolean;
    selectedItemIndex: number;
    focusedItemIndex?: number;
    listSize: number;
};
export declare enum ACTIONS {
    FOCUS_SEARCH = "focusOnSearch",
    UPDATE_STATE = "updateState",
    MOVE = "move"
}
export declare type ReducerAction = {
    type: ACTIONS;
    payload: Partial<ReducerState> & {
        positions?: number;
        step?: number;
    };
};
export declare type useSelectAndFocusReturnType = {
    selectedItemIndex: number;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    focusOnSearch: boolean;
    focusedItemIndex?: number;
    setFocusedItemIndex: (index?: number) => void;
    setFocusOnSearch: () => void;
};
declare function useSelectAndFocusOnArrowNavigation(listSize: number, step: number): useSelectAndFocusReturnType;
export declare const ensureSafeIndex: (index: number, listSize: number) => number;
export default useSelectAndFocusOnArrowNavigation;
