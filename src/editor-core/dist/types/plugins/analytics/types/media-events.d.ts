import { TrackAEP, UIAEP } from './utils';
import { ACTION_SUBJECT, ACTION, ACTION_SUBJECT_ID } from './enums';
declare type MediaLinkActionType = ACTION.ADDED | ACTION.EDITED | ACTION.DELETED | ACTION.VISITED | ACTION.ERRORED;
export declare type MediaLinkAEP = TrackAEP<MediaLinkActionType, ACTION_SUBJECT.MEDIA, ACTION_SUBJECT_ID.LINK, any, undefined>;
declare type MediaAltTextAction = TrackAEP<ACTION.ADDED | ACTION.CLOSED | ACTION.EDITED | ACTION.CLEARED | ACTION.OPENED, ACTION_SUBJECT.MEDIA, ACTION_SUBJECT_ID.ALT_TEXT, undefined, undefined>;
declare type MediaUIAction = UIAEP<ACTION.EDITED, ACTION_SUBJECT.MEDIA_SINGLE | ACTION_SUBJECT.EMBEDS, ACTION_SUBJECT_ID.RESIZED, any, undefined>;
export declare type MediaAltTextActionType = ACTION.ADDED | ACTION.CLOSED | ACTION.EDITED | ACTION.CLEARED | ACTION.OPENED;
export declare type MediaEventPayload = MediaLinkAEP | MediaAltTextAction | MediaUIAction;
export {};
