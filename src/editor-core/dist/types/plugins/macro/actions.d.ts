import { EditorState } from 'prosemirror-state';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { Providers, MacroProvider, MacroAttributes } from '@atlaskit/editor-common/provider-factory';
import { CommandDispatch } from '../../types';
export declare const insertMacroFromMacroBrowser: (macroProvider: MacroProvider, macroNode?: PmNode<any> | undefined, isEditing?: boolean | undefined) => (state: EditorState, dispatch?: CommandDispatch | undefined) => Promise<boolean>;
export declare const resolveMacro: (macro?: MacroAttributes | undefined, state?: EditorState<any> | undefined, optionalAttrs?: object | undefined) => PmNode | null;
export declare const runMacroAutoConvert: (state: EditorState, text: String) => PmNode | null;
export declare const setMacroProvider: (provider: Providers['macroProvider']) => (view: EditorView) => Promise<boolean>;
