import { OperationalAEP, ScreenAEP, UIAEP } from './utils';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from './enums';
export declare type RecentActivitiesPerfAEP = OperationalAEP<ACTION.INVOKED, ACTION_SUBJECT.SEARCH_RESULT, ACTION_SUBJECT_ID.RECENT_ACTIVITIES, {
    duration: number;
    count: number;
    errorCode?: number;
}, {
    error?: string;
}>;
export declare type QuickSearchPerfAEP = OperationalAEP<ACTION.INVOKED, ACTION_SUBJECT.SEARCH_RESULT, ACTION_SUBJECT_ID.QUICK_SEARCH, {
    duration: number;
    count: number;
    errorCode?: number;
}, {
    error?: string;
}>;
export declare type ViewedCreateLinkInlineDialogAEP = ScreenAEP<ACTION.VIEWED, ACTION_SUBJECT.CREATE_LINK_INLINE_DIALOG, undefined, {
    timesViewed: number;
    searchSessionId: string;
    trigger: string;
}, undefined>;
export declare type DismissedCreateLinkInlineDialogAEP = UIAEP<ACTION.DISMISSED, ACTION_SUBJECT.CREATE_LINK_INLINE_DIALOG, undefined, {
    source: string;
    searchSessionId: string;
    trigger: string;
}, undefined>;
export declare type EnteredTextLinkSearchInputAEP = UIAEP<ACTION.ENTERED, ACTION_SUBJECT.TEXT, ACTION_SUBJECT_ID.LINK_SEARCH_INPUT, {
    queryLength: number;
    queryVersion: number;
    queryHash: string;
    searchSessionId: string;
    wordCount: number;
    source: string;
}, {
    query: string;
}>;
export declare type ShownPreQuerySearchResultsAEP = UIAEP<ACTION.SHOWN, ACTION_SUBJECT.SEARCH_RESULT, ACTION_SUBJECT_ID.PRE_QUERY_SEARCH_RESULTS, {
    source: string;
    preQueryRequestDurationMs: number;
    searchSessionId: string;
    resultCount: number;
    results: Array<{
        resultContentId: string;
        resultType: string;
    }>;
}, undefined>;
export declare type ShownPostQuerySearchResultsAEP = UIAEP<ACTION.SHOWN, ACTION_SUBJECT.SEARCH_RESULT, ACTION_SUBJECT_ID.POST_QUERY_SEARCH_RESULTS, {
    source: string;
    postQueryRequestDurationMs: number;
    searchSessionId: string;
    resultCount: number;
    results: Array<{
        resultContentId: string;
        resultType: string;
    }>;
}, undefined>;
export declare type HighlightedSearchResultsAEP = UIAEP<ACTION.HIGHLIGHTED, ACTION_SUBJECT.SEARCH_RESULT, undefined, {
    source: string;
    searchSessionId: string;
    selectedResultId: string;
    selectedRelativePosition: number;
}, undefined>;
export declare type SelectedSearchResultsAEP = UIAEP<ACTION.SELECTED, ACTION_SUBJECT.SEARCH_RESULT, undefined, {
    source: string;
    searchSessionId: string;
    trigger: string;
    resultCount: number;
    selectedResultId: string;
    selectedRelativePosition: number;
}, undefined>;
export declare type CreateLinkInlineDialogEventPayload = QuickSearchPerfAEP | RecentActivitiesPerfAEP | ViewedCreateLinkInlineDialogAEP | EnteredTextLinkSearchInputAEP | ShownPreQuerySearchResultsAEP | ShownPostQuerySearchResultsAEP | HighlightedSearchResultsAEP | SelectedSearchResultsAEP | DismissedCreateLinkInlineDialogAEP;
export declare type CreateLinkInlineDialogActionType = ACTION.INVOKED | ACTION.VIEWED | ACTION.ENTERED | ACTION.SHOWN;
