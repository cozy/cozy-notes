import { Fragment, Node as PmNode, Slice } from 'prosemirror-model';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { TextSelection, Transaction, Selection } from 'prosemirror-state';
import { Step } from 'prosemirror-transform';
import { Match } from '../types';
export declare function getSelectedText(selection: TextSelection): string;
export declare const createDecorations: (selectedIndex: number, matches: {
    start: number;
    end: number;
}[]) => Decoration[];
export declare const createDecoration: (start: number, end: number, isSelected?: boolean | undefined) => Decoration<{
    [key: string]: any;
} & import("prosemirror-view").InlineDecorationSpec>;
export declare function findMatches(content: PmNode | Fragment, searchText: string, shouldMatchCase: boolean, contentIndex?: number): Match[];
/**
 * Finds index of first item in matches array that comes after user's cursor pos.
 * If `backward` is `true`, finds index of first item that comes before instead.
 */
export declare function findSearchIndex(selectionPos: number, matches: Match[], backward?: boolean): number;
export declare const nextIndex: (currentIndex: number, total: number) => number;
export declare const prevIndex: (currentIndex: number, total: number) => number;
export declare const getSelectionForMatch: (selection: Selection, doc: PmNode, index: number, matches: Match[], offset?: number) => TextSelection;
export declare const findDecorationFromMatch: (decorationSet: DecorationSet, match: Match) => Decoration | undefined;
export declare const removeDecorationsFromSet: (decorationSet: DecorationSet, decorationsToRemove: Decoration[], doc: PmNode) => DecorationSet;
export declare const removeMatchesFromSet: (decorationSet: DecorationSet, matches: Match[], doc: PmNode) => DecorationSet<any>;
/**
 * Finds decorations in prevDecorations that are not in newDecorations or decorationsToRemove
 * These decorations have been lost by Prosemirror during an over eager decoration removal
 * We need to be smart to cope with thousands of decorations without crashing everything
 */
export declare const findLostAdjacentDecorations: (decorationsToRemove: Decoration[], prevDecorations: Decoration[], newDecorations: Decoration[]) => Decoration[];
/**
 * Searches through array in bumps of 100 to return the index of the first
 * decoration whose 'from' value is before or equal to the position
 */
export declare const findIndexBeforePosition: (items: Decoration[], position: number) => number;
/**
 * Determines whether a find/replace text Match will be changed as a result
 * of a Step modification to the document. This is evaluated by checking
 * both mapped and unmapped versions of the Step as in different cases the
 * matches will match.
 *
 * **Note:** Match state received here is after step has been applied.
 */
export declare const isMatchAffectedByStep: (match: Match, step: Step<any> & {
    from: number;
    to: number;
    slice: Slice;
}, tr: Transaction) => boolean;
