import { ACTION, ACTION_SUBJECT_ID, ACTION_SUBJECT } from './enums';
import { TrackAEP } from './utils';
declare type ExperimentalAEP<Action, ActionSubject, ActionSubjectId, Attributes> = TrackAEP<Action, ActionSubject, ActionSubjectId, Attributes & {
    experiment: string;
    experimentGroup: string;
}, undefined>;
export interface TextColorSelectedAttr {
    color: string;
    isShowingMoreColors: boolean;
    isNewColor: boolean;
}
export declare type ExperimentalTextColorSelectedAEP = ExperimentalAEP<ACTION.FORMATTED, ACTION_SUBJECT.TEXT, ACTION_SUBJECT_ID.FORMAT_COLOR, TextColorSelectedAttr>;
export interface TextColorShowMoreToggleAttr {
    showMoreButton: boolean;
    showLessButton: boolean;
}
export declare type ExperimentalTextColorShowMoreToggleAEP = ExperimentalAEP<ACTION.OPENED | ACTION.CLOSED, ACTION_SUBJECT.TOOLBAR, ACTION_SUBJECT_ID.FORMAT_COLOR, TextColorShowMoreToggleAttr>;
export interface TextColorShowPaletteToggleAttr {
    isShowingMoreColors: boolean;
    noSelect: boolean;
}
export declare type ExperimentalTextColorShowPaletteToggleAEP = ExperimentalAEP<ACTION.OPENED | ACTION.CLOSED, ACTION_SUBJECT.TOOLBAR, ACTION_SUBJECT_ID.FORMAT_COLOR, TextColorShowPaletteToggleAttr>;
export declare type ExperimentalEventPayload = ExperimentalTextColorSelectedAEP | ExperimentalTextColorShowMoreToggleAEP | ExperimentalTextColorShowPaletteToggleAEP;
export {};
