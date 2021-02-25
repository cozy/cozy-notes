import { Schema, NodeType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { InputRuleWithHandler } from '../../../utils/input-rules';
export declare function headingRule(nodeType: NodeType, maxLevel: number): InputRuleWithHandler;
export declare function blockQuoteRule(nodeType: NodeType): InputRuleWithHandler;
export declare function codeBlockRule(nodeType: NodeType): import("prosemirror-inputrules").InputRule<any>;
export declare function inputRulePlugin(schema: Schema): Plugin | undefined;
export default inputRulePlugin;
