import { UIAEP } from './utils';
import { ACTION, ACTION_SUBJECT } from './enums';
declare type OpenAEP = UIAEP<ACTION.OPENED, ACTION_SUBJECT.ELEMENT_BROWSER, undefined, {
    mode: 'full' | 'inline';
}, undefined>;
declare type CloseAEP = UIAEP<ACTION.CLOSED, ACTION_SUBJECT.ELEMENT_BROWSER, undefined, {
    mode: 'full' | 'inline';
}, undefined>;
export declare type ElementBrowserEventPayload = OpenAEP | CloseAEP;
export {};
