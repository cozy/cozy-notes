import { TrackAEP } from './utils';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD } from './enums';
declare type TypeDateStartedAEP = TrackAEP<ACTION.TYPING_STARTED, ACTION_SUBJECT.DATE, undefined, undefined, undefined>;
declare type TypeDateFinishedAEP = TrackAEP<ACTION.TYPING_FINISHED, ACTION_SUBJECT.DATE, undefined, undefined, undefined>;
declare type IncrementDateSegmentAEP = TrackAEP<ACTION.INCREMENTED, ACTION_SUBJECT.DATE_SEGMENT, undefined, {
    dateSegment: ACTION_SUBJECT_ID.DATE_DAY | ACTION_SUBJECT_ID.DATE_MONTH | ACTION_SUBJECT_ID.DATE_YEAR;
}, undefined>;
declare type DecrementDateSegmentAEP = TrackAEP<ACTION.DECREMENTED, ACTION_SUBJECT.DATE_SEGMENT, undefined, {
    dateSegment: ACTION_SUBJECT_ID.DATE_DAY | ACTION_SUBJECT_ID.DATE_MONTH | ACTION_SUBJECT_ID.DATE_YEAR;
}, undefined>;
declare type CommitDateAEP = TrackAEP<ACTION.COMMITTED, ACTION_SUBJECT.DATE, undefined, {
    commitMethod: INPUT_METHOD.PICKER | INPUT_METHOD.BLUR | INPUT_METHOD.KEYBOARD;
    isValid: true | false;
    isToday: true | false;
}, undefined>;
export declare type DateEventPayload = TypeDateStartedAEP | TypeDateFinishedAEP | IncrementDateSegmentAEP | DecrementDateSegmentAEP | CommitDateAEP;
export {};
