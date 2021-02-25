import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
declare const validCombos: {
    '**': string[];
    '*': string[];
    __: string[];
    _: string[];
    '~~': string[];
};
export declare type ValidCombosKey = keyof typeof validCombos;
export declare const strongRegex1: RegExp;
export declare const strongRegex2: RegExp;
export declare const italicRegex1: RegExp;
export declare const italicRegex2: RegExp;
export declare const strikeRegex: RegExp;
export declare const codeRegex: RegExp;
export declare function inputRulePlugin(schema: Schema): Plugin | undefined;
export default inputRulePlugin;
