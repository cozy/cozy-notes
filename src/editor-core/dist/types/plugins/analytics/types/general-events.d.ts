import { UIAEP, TrackAEP, OperationalAEP, OperationalAEPWithObjectId } from './utils';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD } from './enums';
import { PluginPerformanceReportData } from '../../../utils/performance/plugin-performance-report';
import { FeatureFlagKey } from '../../feature-flags-context/types';
import { AnnotationAEP } from './inline-comment-events';
import { RichMediaLayout } from '@atlaskit/adf-schema';
import { SEVERITY } from '@atlaskit/editor-common';
export declare enum PLATFORMS {
    NATIVE = "mobileNative",
    HYBRID = "mobileHybrid",
    WEB = "web"
}
export declare enum MODE {
    RENDERER = "renderer",
    EDITOR = "editor"
}
export declare enum FULL_WIDTH_MODE {
    FIXED_WIDTH = "fixedWidth",
    FULL_WIDTH = "fullWidth"
}
export declare enum BROWSER_FREEZE_INTERACTION_TYPE {
    LOADING = "loading",
    TYPING = "typing",
    CLICKING = "clicking",
    PASTING = "pasting"
}
declare type ButtonAEP<ActionSubjectID, Attributes> = UIAEP<ACTION.CLICKED, ACTION_SUBJECT.BUTTON, ActionSubjectID, Attributes, undefined>;
declare type PickerAEP<ActionSubjectID, Attributes> = UIAEP<ACTION.OPENED, ACTION_SUBJECT.PICKER, ActionSubjectID, Attributes, undefined>;
declare type FeedbackAEP = UIAEP<ACTION.OPENED, ACTION_SUBJECT.FEEDBACK_DIALOG, undefined, {
    inputMethod: INPUT_METHOD.QUICK_INSERT;
}, undefined>;
declare type TypeAheadAEP<ActionSubjectID, Attributes> = UIAEP<ACTION.INVOKED, ACTION_SUBJECT.TYPEAHEAD, ActionSubjectID, Attributes, undefined>;
declare type EditorStartAEP = UIAEP<ACTION.STARTED, ACTION_SUBJECT.EDITOR, undefined, {
    platform: PLATFORMS.NATIVE | PLATFORMS.HYBRID | PLATFORMS.WEB;
    featureFlags: FeatureFlagKey[];
}, undefined>;
declare type EditorPerfAEP = OperationalAEPWithObjectId<ACTION.EDITOR_MOUNTED | ACTION.PROSEMIRROR_RENDERED, ACTION_SUBJECT.EDITOR, undefined, {
    duration: number;
    startTime: number;
    nodes?: Record<string, number>;
    ttfb?: number;
    severity?: SEVERITY;
}, undefined>;
declare type EditorTTIAEP = OperationalAEP<ACTION.EDITOR_TTI, ACTION_SUBJECT.EDITOR, undefined, {
    tti: number;
    ttiFromInvocation: number;
    canceled: boolean;
}, undefined>;
declare type BrowserFreezePayload = OperationalAEPWithObjectId<ACTION.BROWSER_FREEZE, ACTION_SUBJECT.EDITOR, undefined, {
    freezeTime: number;
    nodeSize: number;
    participants: number;
    nodeCount?: Record<string, number>;
    interactionType?: BROWSER_FREEZE_INTERACTION_TYPE;
    severity?: SEVERITY;
}, undefined>;
declare type SlowInputAEP = OperationalAEPWithObjectId<ACTION.SLOW_INPUT, ACTION_SUBJECT.EDITOR, undefined, {
    time: number;
    nodeSize: number;
    participants: number;
    nodeCount?: Record<string, number>;
}, undefined>;
declare type InputPerfSamlingAEP = OperationalAEPWithObjectId<ACTION.INPUT_PERF_SAMPLING, ACTION_SUBJECT.EDITOR, undefined, {
    time: number;
    nodeSize: number;
    participants: number;
    nodeCount?: Record<string, number>;
}, undefined>;
declare type DispatchedTransactionAEP = OperationalAEP<ACTION.TRANSACTION_DISPATCHED, ACTION_SUBJECT.EDITOR, undefined, {
    report: PluginPerformanceReportData;
    participants: number;
}, undefined>;
declare type WithPluginStateCalledAEP = OperationalAEP<ACTION.WITH_PLUGIN_STATE_CALLED, ACTION_SUBJECT.EDITOR, undefined, {
    plugin: string;
    duration: number;
    participants: number;
}, undefined>;
declare type ReactNodeViewRenderedAEP = OperationalAEP<ACTION.REACT_NODEVIEW_RENDERED, ACTION_SUBJECT.EDITOR, undefined, {
    node: string;
    duration: number;
    participants: number;
}, undefined>;
declare type UploadExternalFailedAEP = OperationalAEP<ACTION.UPLOAD_EXTERNAL_FAIL, ACTION_SUBJECT.EDITOR, undefined, undefined, undefined>;
declare type EditorStopAEP = UIAEP<ACTION.STOPPED, ACTION_SUBJECT.EDITOR, ACTION_SUBJECT_ID.SAVE | ACTION_SUBJECT_ID.CANCEL, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
    documentSize: number;
    nodeCount?: {
        tables: number;
        headings: number;
        lists: number;
        mediaSingles: number;
        mediaGroups: number;
        panels: number;
        extensions: number;
        decisions: number;
        actions: number;
        codeBlocks: number;
    };
}, undefined>;
declare type AnnotateButtonAEP = UIAEP<ACTION.CLICKED, ACTION_SUBJECT.MEDIA, ACTION_SUBJECT_ID.ANNOTATE_BUTTON, undefined, undefined>;
declare type ButtonHelpAEP = ButtonAEP<ACTION_SUBJECT_ID.BUTTON_HELP, {
    inputMethod: INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}>;
declare type ButtonFeedbackAEP = ButtonAEP<ACTION_SUBJECT_ID.BUTTON_FEEDBACK, undefined>;
declare type PickerEmojiAEP = PickerAEP<ACTION_SUBJECT_ID.PICKER_EMOJI, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU;
}>;
declare type PickerImageAEP = PickerAEP<ACTION_SUBJECT_ID.PICKER_CLOUD, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.INSERT_MENU;
}>;
declare type TypeAheadQuickInsertAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_QUICK_INSERT, {
    inputMethod: INPUT_METHOD.KEYBOARD;
}>;
declare type HelpQuickInsertAEP = UIAEP<ACTION.HELP_OPENED, ACTION_SUBJECT.HELP, ACTION_SUBJECT_ID.HELP_QUICK_INSERT, {
    inputMethod: INPUT_METHOD.QUICK_INSERT;
}, undefined>;
declare type TypeAheadEmojiAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.KEYBOARD;
}>;
declare type TypeAheadLinkAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_LINK, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.SHORTCUT;
}>;
declare type TypeAheadMentionAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_MENTION, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.KEYBOARD;
}>;
declare type FullWidthModeAEP = TrackAEP<ACTION.CHANGED_FULL_WIDTH_MODE, ACTION_SUBJECT.EDITOR, undefined, {
    previousMode: FULL_WIDTH_MODE;
    newMode: FULL_WIDTH_MODE;
}, undefined>;
declare type ExpandToggleAEP = TrackAEP<ACTION.TOGGLE_EXPAND, ACTION_SUBJECT.EXPAND | ACTION_SUBJECT.NESTED_EXPAND, undefined, {
    platform: PLATFORMS;
    mode: MODE;
    expanded: boolean;
}, undefined>;
declare type RichMediaLayoutAEP = TrackAEP<ACTION.SELECTED, ACTION_SUBJECT.MEDIA_SINGLE | ACTION_SUBJECT.EMBEDS, ACTION_SUBJECT_ID.RICH_MEDIA_LAYOUT, {
    previousLayoutType: RichMediaLayout;
    currentLayoutType: RichMediaLayout;
}, undefined>;
export declare type GeneralEventPayload = EditorStartAEP | EditorStopAEP | AnnotateButtonAEP | AnnotationAEP | ButtonHelpAEP | ButtonFeedbackAEP | PickerEmojiAEP | PickerImageAEP | FeedbackAEP | TypeAheadQuickInsertAEP | TypeAheadEmojiAEP | TypeAheadLinkAEP | TypeAheadMentionAEP | FullWidthModeAEP | EditorPerfAEP | EditorTTIAEP | BrowserFreezePayload | SlowInputAEP | UploadExternalFailedAEP | InputPerfSamlingAEP | HelpQuickInsertAEP | ExpandToggleAEP | DispatchedTransactionAEP | WithPluginStateCalledAEP | ReactNodeViewRenderedAEP | RichMediaLayoutAEP;
export {};
