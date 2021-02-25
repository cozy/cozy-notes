import { TrackAEP } from './utils';
import { ACTION_SUBJECT, INPUT_METHOD, ACTION, ACTION_SUBJECT_ID } from './enums';
import { PanelType } from '@atlaskit/adf-schema';
export declare enum LAYOUT_TYPE {
    TWO_COLS_EQUAL = "twoColumnsEqual",
    THREE_COLS_EQUAL = "threeColumnsEqual",
    LEFT_SIDEBAR = "twoColumnsLeftSidebar",
    RIGHT_SIDEBAR = "twoColumnsRightSidebar",
    THREE_WITH_SIDEBARS = "threeColumnsWithSidebars "
}
export declare enum SMART_LINK_TYPE {
    INLINE_CARD = "inline",
    BLOCK_CARD = "block",
    URL = "url"
}
declare type DeletePanelAEP = TrackAEP<ACTION.DELETED, ACTION_SUBJECT.PANEL, undefined, {
    inputMethod: INPUT_METHOD.TOOLBAR;
}, undefined>;
declare type ChangePanelAEP = TrackAEP<ACTION.CHANGED_TYPE, ACTION_SUBJECT.PANEL, undefined, {
    newType: PanelType;
    previousType: PanelType;
}, undefined>;
declare type ChangeSmartLinkAEP = TrackAEP<ACTION.CHANGED_TYPE, ACTION_SUBJECT.SMART_LINK, undefined, {
    newType: SMART_LINK_TYPE;
    previousType: SMART_LINK_TYPE;
}, undefined>;
declare type VisitedSmartLink = TrackAEP<ACTION.VISITED, ACTION_SUBJECT.SMART_LINK, ACTION_SUBJECT_ID.CARD_BLOCK | ACTION_SUBJECT_ID.CARD_INLINE, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.CARD;
}, undefined>;
declare type DeletedSmartLink = TrackAEP<ACTION.DELETED, ACTION_SUBJECT.SMART_LINK, ACTION_SUBJECT_ID.CARD_BLOCK | ACTION_SUBJECT_ID.CARD_INLINE, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.CARD;
    displayMode: ACTION_SUBJECT_ID.CARD_BLOCK | ACTION_SUBJECT_ID.CARD_INLINE;
}, undefined>;
declare type ChangedLayoutAEP = TrackAEP<ACTION.CHANGED_LAYOUT, ACTION_SUBJECT.LAYOUT, undefined, {
    previousLayout: LAYOUT_TYPE;
    newLayout: LAYOUT_TYPE;
}, undefined>;
declare type DeletedLayoutAEP = TrackAEP<ACTION.DELETED, ACTION_SUBJECT.LAYOUT, undefined, {
    layout: LAYOUT_TYPE;
}, undefined>;
declare type DeletedExpandAEP = TrackAEP<ACTION.DELETED, ACTION_SUBJECT.EXPAND | ACTION_SUBJECT.NESTED_EXPAND, undefined, {
    inputMethod: INPUT_METHOD.TOOLBAR;
}, undefined>;
declare type UnsupportedContentAEP = TrackAEP<ACTION.UNSUPPORTED_CONTENT_ENCOUNTERED, ACTION_SUBJECT.DOCUMENT, ACTION_SUBJECT_ID.UNSUPPORTED_BLOCK | ACTION_SUBJECT_ID.UNSUPPORTED_INLINE | ACTION_SUBJECT_ID.UNSUPPORTED_MARK, {
    unsupportedNode: {
        type: string;
        parentType: string;
        ancestry: string;
    };
}, undefined>;
export declare type NodeEventPayload = ChangePanelAEP | DeletePanelAEP | DeletedSmartLink | VisitedSmartLink | ChangedLayoutAEP | DeletedLayoutAEP | DeletedExpandAEP | ChangeSmartLinkAEP | UnsupportedContentAEP;
export {};
