import { IndentationMarkAttributes } from '@atlaskit/adf-schema';
import { INDENT_DIRECTION } from '../../analytics';
import { EditorState, Transaction } from 'prosemirror-state';
import { GetAttrsChange } from '../../../utils/getAttrsWithChangesRecorder';
export declare type PrevAttributes = IndentationMarkAttributes | undefined;
export declare type NewAttributes = IndentationMarkAttributes | undefined | false;
export declare type IndentationChangesOptions = {
    direction: INDENT_DIRECTION;
};
/**
 * Get the current indentation level given prev and new attributes
 * @param prevAttrs - Previous attributes from indentation
 * @param newAttrs - New attributes from indentation
 */
export declare function getNewIndentLevel(prevAttrs: PrevAttributes, newAttrs: NewAttributes): number;
/**
 * Get the previous indentation level  prev attributes
 * @param prevAttrs - Previous attributes from indentation
 */
export declare function getPrevIndentLevel(prevAttrs: PrevAttributes): number;
/**
 * Create a new dispatch function who add analytics events given a list of attributes changes
 *
 * @export
 * @param {*} getAttrsChanges
 * @param {*} state
 * @param dispatch
 * @returns
 */
export declare function createAnalyticsDispatch(getAttrsChanges: () => GetAttrsChange<IndentationMarkAttributes, IndentationChangesOptions>[], state: EditorState, dispatch?: (tr: Transaction) => void): (tr: Transaction) => void;
