import { InputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
export declare function createLinkInputRule(regexp: RegExp): InputRule;
export declare function createInputRulePlugin(schema: Schema): Plugin | undefined;
export default createInputRulePlugin;
