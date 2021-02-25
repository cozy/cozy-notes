import { ACTION, ACTION_SUBJECT_ID, ACTION_SUBJECT } from './enums';
import { TABLE_ACTION } from './table-events';
import { TrackAEP } from './utils';
declare type HistoryAEP<Action> = TrackAEP<Action, ACTION_SUBJECT, ACTION | TABLE_ACTION, {
    [key: string]: any;
    actionSubjectId: ACTION_SUBJECT_ID | undefined | null;
}, undefined>;
declare type UndoAEP = HistoryAEP<ACTION.UNDID>;
declare type RedoAEP = HistoryAEP<ACTION.REDID>;
export declare type HistoryEventPayload = UndoAEP | RedoAEP;
export {};
