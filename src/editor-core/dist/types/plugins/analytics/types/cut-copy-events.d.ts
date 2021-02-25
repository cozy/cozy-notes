import { TrackAEP } from './utils';
import { ACTION, ACTION_SUBJECT } from './enums';
declare type CopyAEP = TrackAEP<ACTION.COPIED, ACTION_SUBJECT.DOCUMENT, undefined, {
    content: string[];
}, undefined>;
declare type CutAEP = TrackAEP<ACTION.CUT, ACTION_SUBJECT.DOCUMENT, undefined, {
    content: string[];
}, undefined>;
export declare type CutCopyEventPayload = CutAEP | CopyAEP;
export {};
