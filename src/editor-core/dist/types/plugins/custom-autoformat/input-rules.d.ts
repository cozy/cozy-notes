import { EditorView } from 'prosemirror-view';
import { AutoformatReplacement } from '@atlaskit/editor-common/provider-factory';
export declare type InputRuleHander = (view: EditorView, match: string[], start: number, end: number) => Promise<AutoformatReplacement>;
export declare type InputRule = {
    matchTyping: RegExp;
    matchEnter: RegExp;
    handler: InputRuleHander;
};
export declare const triggerInputRule: (view: EditorView, rules: Array<InputRule>, from: number, to: number, text: string) => boolean;
