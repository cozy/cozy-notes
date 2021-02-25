import { WalkNode } from '../../../utils/commands';
import { LIST_TEXT_SCENARIOS } from '../../analytics';
import { Command } from '../../../types';
import { ResolvedPos } from 'prosemirror-model';
declare type ScenariosAllowed = LIST_TEXT_SCENARIOS.JOIN_PARAGRAPH_WITH_LIST | LIST_TEXT_SCENARIOS.JOIN_SIBLINGS | LIST_TEXT_SCENARIOS.JOIN_DESCENDANT_TO_PARENT | LIST_TEXT_SCENARIOS.JOIN_PARENT_SIBLING_TO_PARENT_CHILD;
export declare const calcJoinListScenario: (walkNode: WalkNode, $head: ResolvedPos) => ScenariosAllowed | false;
export declare const listDelete: Command;
export {};
