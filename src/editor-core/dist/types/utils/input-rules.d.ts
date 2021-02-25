import { InputRule } from 'prosemirror-inputrules';
import { EditorState, Transaction } from 'prosemirror-state';
export declare type InputRuleWithHandler = InputRule & {
    handler: InputRuleHandler;
};
export declare type InputRuleHandler = (state: EditorState, match: Array<string>, start: number, end: number) => Transaction | null;
export declare function defaultInputRuleHandler(inputRule: InputRuleWithHandler, isBlockNodeRule?: boolean): InputRuleWithHandler;
export declare function instrumentedInputRule(pluginName: string, { rules }: {
    rules: any;
}): import("prosemirror-state").Plugin<any, any>;
export declare function createInputRule(match: RegExp, handler: InputRuleHandler, isBlockNodeRule?: boolean): InputRuleWithHandler;
export declare const leafNodeReplacementCharacter = "\uFFFC";
