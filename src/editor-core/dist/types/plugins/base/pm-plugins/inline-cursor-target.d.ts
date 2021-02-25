import { ResolvedPos, Node } from 'prosemirror-model';
import { PluginKey, Plugin, Transaction } from 'prosemirror-state';
export declare const inlineCursorTargetStateKey: PluginKey<any, any>;
export declare const SPECIAL_NODES: string[];
export declare const isSpecial: (node: Node | null | undefined) => boolean | null | undefined;
export declare const findSpecialNodeAfter: ($pos: ResolvedPos, tr: Transaction) => number | undefined;
export declare const findSpecialNodeBefore: ($pos: ResolvedPos, tr: Transaction) => number | undefined;
export interface InlineCursorTargetState {
    positions: number[];
}
declare const _default: () => Plugin<InlineCursorTargetState, any>;
export default _default;
