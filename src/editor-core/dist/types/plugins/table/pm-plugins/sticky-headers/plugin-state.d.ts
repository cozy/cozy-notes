export declare type RowStickyState = {
    pos: number;
    top: number;
    padding: number;
    sticky: boolean;
};
export declare type StickyPluginState = RowStickyState[];
export declare type UpdateSticky = {
    name: 'UPDATE';
    state: RowStickyState;
};
export declare type RemoveSticky = {
    name: 'REMOVE';
    pos: number;
};
export declare type StickyPluginAction = UpdateSticky | RemoveSticky;
declare const createPluginState: (dispatch: import("../../../../event-dispatcher").Dispatch<any>, initialState: StickyPluginState | ((state: import("prosemirror-state").EditorState<any>) => StickyPluginState)) => import("prosemirror-state").StateField<StickyPluginState, import("prosemirror-model").Schema<any, any>>, createCommand: <A = StickyPluginAction>(action: A | ((state: Readonly<import("prosemirror-state").EditorState<any>>) => false | A), transform?: ((tr: import("prosemirror-state").Transaction<any>, state: import("prosemirror-state").EditorState<any>) => import("prosemirror-state").Transaction<any>) | undefined) => import("../../../..").Command;
export { createPluginState, createCommand };
