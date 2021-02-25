export declare enum HistoryActionTypes {
    UPDATE = "UPDATE"
}
export interface Update {
    type: HistoryActionTypes.UPDATE;
    canUndo: boolean;
    canRedo: boolean;
}
export declare type HistoryAction = Update;
