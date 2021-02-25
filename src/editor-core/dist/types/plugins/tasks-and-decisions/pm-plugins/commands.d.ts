import { ResolvedPos } from 'prosemirror-model';
import { Command } from '../../../types';
export declare const liftSelection: Command;
export declare const wrapSelectionInTaskList: Command;
/**
 * Tries to move the paragraph content near the given position into the taskItem or decisionItem
 * before it.
 *
 * Looks backwards from the given position to find the "cut point" between the last taskItem and the
 * following paragraph. Then tries to move the content from that paragraph into the taskItem.
 *
 * @param $pos Position at the end of, or anywhere in paragraph following, the last taskItem
 * @see {joinToPreviousListItem}
 */
export declare const joinAtCut: ($pos: ResolvedPos) => Command;
