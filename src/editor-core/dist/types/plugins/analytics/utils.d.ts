import { EditorState, Transaction } from 'prosemirror-state';
import { InputRuleWithHandler } from '../../utils/input-rules';
import { AnalyticsEventPayloadWithChannel, AnalyticsEventPayload } from './types';
import { SELECTION_TYPE, SELECTION_POSITION } from './types/utils';
import { HigherOrderCommand } from '../../types/command';
export declare function getStateContext(state: EditorState, payload: AnalyticsEventPayload): AnalyticsEventPayload;
export declare function getSelectionType(state: EditorState): {
    type: SELECTION_TYPE;
    position?: SELECTION_POSITION;
};
export declare function findInsertLocation(state: EditorState): string;
export declare function addAnalytics(state: EditorState, tr: Transaction, payload: AnalyticsEventPayload, channel?: string): Transaction;
export declare type AnalyticsEventPayloadCallback = (state: EditorState) => AnalyticsEventPayload | undefined;
export declare function withAnalytics(payload: AnalyticsEventPayload | AnalyticsEventPayloadCallback, channel?: string): HigherOrderCommand;
export declare function ruleWithAnalytics(getPayload: (state: EditorState, match: string[], start: number, end: number) => AnalyticsEventPayload): (rule: InputRuleWithHandler) => InputRuleWithHandler;
export declare function getAnalyticsEventsFromTransaction(tr: Transaction): AnalyticsEventPayloadWithChannel[];
