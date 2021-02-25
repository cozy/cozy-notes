import { PluginKey, Selection } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export declare const selectionPluginKey: PluginKey<any, any>;
export declare const gapCursorPluginKey: PluginKey<any, any>;
export declare enum RelativeSelectionPos {
    Before = "Before",
    Start = "Start",
    Inside = "Inside",
    End = "End"
}
export declare enum SelectionDirection {
    Before = -1,
    After = 1
}
export interface SelectionPluginState {
    /** Selected node class decorations */
    decorationSet: DecorationSet;
    /** Selection the decorations were built for */
    selection: Selection;
    /**
     * Relative position of selection to either its parent node or, if a NodeSelection, its own node
     * Used to manage where the selection should go when using arrow keys
     */
    selectionRelativeToNode?: RelativeSelectionPos;
}
export interface LongPressSelectionPluginOptions {
    useLongPressSelection?: boolean;
}
export interface SelectionPluginOptions extends LongPressSelectionPluginOptions {
}
