import { WalkNode } from '../../../utils/commands';
import { LIST_TEXT_SCENARIOS } from '../../analytics';
import { Command } from '../../../types';
import { ResolvedPos } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
declare type ScenariosAllowed = LIST_TEXT_SCENARIOS.JOIN_SIBLINGS | LIST_TEXT_SCENARIOS.JOIN_DESCENDANT_TO_PARENT | LIST_TEXT_SCENARIOS.JOIN_TO_SIBLING_DESCENDANT;
export declare const calcJoinListScenario: (walkNode: WalkNode, $head: ResolvedPos, tr: Transaction) => [ScenariosAllowed, ResolvedPos | null] | false;
export declare const listBackspace: Command;
export {};
