import { UIAEP } from './utils';
import { ACTION, ACTION_SUBJECT } from './enums';
declare type OpenAEP = UIAEP<ACTION.OPENED, ACTION_SUBJECT.CONFIG_PANEL, undefined, {}, undefined>;
declare type CloseAEP = UIAEP<ACTION.CLOSED, ACTION_SUBJECT.CONFIG_PANEL, undefined, {}, undefined>;
export declare type ConfigPanelEventPayload = OpenAEP | CloseAEP;
export {};
