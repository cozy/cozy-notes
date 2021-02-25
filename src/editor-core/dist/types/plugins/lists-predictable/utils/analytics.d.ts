import { EditorState } from 'prosemirror-state';
import { CommonListAnalyticsAttributes } from '../../analytics';
export declare const getCommonListAnalyticsAttributes: (state: EditorState) => CommonListAnalyticsAttributes;
export declare const countListItemsInSelection: (state: EditorState) => number;
