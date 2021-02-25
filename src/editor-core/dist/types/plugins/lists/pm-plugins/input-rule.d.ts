import { NodeType, Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import { InputRuleWithHandler } from '../../../utils/input-rules';
export declare function createInputRule(regexp: RegExp, nodeType: NodeType): InputRuleWithHandler;
export declare const insertList: (state: EditorState, listType: NodeType, start: number, end: number) => import("prosemirror-state").Transaction<any> | null;
export default function inputRulePlugin(schema: Schema): Plugin | undefined;
