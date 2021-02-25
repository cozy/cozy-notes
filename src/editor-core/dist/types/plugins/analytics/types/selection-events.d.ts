import { TrackAEP } from './utils';
import { ACTION_SUBJECT_ID, ACTION, ACTION_SUBJECT } from './enums';
declare type SelectAEP<ActionSubjectID, Attributes> = TrackAEP<ACTION.SELECTED, ACTION_SUBJECT.DOCUMENT, ActionSubjectID, Attributes, undefined>;
export declare type SelectNodeAEP = SelectAEP<ACTION_SUBJECT_ID.NODE, {
    node: string;
}>;
export declare type SelectRangeAEP = SelectAEP<ACTION_SUBJECT_ID.RANGE, {
    nodes: string[];
    from: number;
    to: number;
}>;
export declare type SelectAllAEP = SelectAEP<ACTION_SUBJECT_ID.ALL, undefined>;
export declare type SelectCellAEP = SelectAEP<ACTION_SUBJECT_ID.CELL, {
    selectedCells: number;
    totalCells: number;
}>;
export declare type SelectionEventPayload = SelectNodeAEP | SelectRangeAEP | SelectAllAEP | SelectCellAEP;
export {};
