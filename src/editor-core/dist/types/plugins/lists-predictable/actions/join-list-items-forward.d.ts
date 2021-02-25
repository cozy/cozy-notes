import { WalkNode } from '../../../utils/commands';
import { LIST_TEXT_SCENARIOS } from '../../analytics';
import { ResolvedPos } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
declare type ScenariosAllowed = LIST_TEXT_SCENARIOS.JOIN_PARAGRAPH_WITH_LIST | LIST_TEXT_SCENARIOS.JOIN_SIBLINGS | LIST_TEXT_SCENARIOS.JOIN_DESCENDANT_TO_PARENT | LIST_TEXT_SCENARIOS.JOIN_PARENT_SIBLING_TO_PARENT_CHILD | LIST_TEXT_SCENARIOS.JOIN_LIST_ITEM_WITH_PARAGRAPH;
declare type DeleteAction = (props: {
    tr: Transaction;
    $next: ResolvedPos;
    $head: ResolvedPos;
}) => boolean;
declare type ScenarioAction = false | [ScenariosAllowed, DeleteAction];
export declare const calcJoinListScenario: (walkNode: WalkNode, $head: ResolvedPos) => ScenarioAction;
export {};
