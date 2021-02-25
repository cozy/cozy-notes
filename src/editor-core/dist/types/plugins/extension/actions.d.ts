import { Slice, Schema, Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { UpdateExtension, UpdateContextActions } from '@atlaskit/editor-common/extensions';
import { MacroProvider } from '@atlaskit/editor-common/provider-factory';
import { Command, CommandDispatch } from '../../types';
import EditorActions from '../../actions';
export declare const buildExtensionNode: <S extends Schema<any, any>>(type: 'inlineExtension' | 'extension' | 'bodiedExtension', schema: S, attrs: object, content?: object | undefined) => PmNode<Schema<any, any>> | undefined;
export declare const performNodeUpdate: (type: 'inlineExtension' | 'extension' | 'bodiedExtension', newAttrs: object, content: object, shouldScrollIntoView: boolean) => (state: EditorState, dispatch?: CommandDispatch | undefined) => void;
export declare const updateExtensionParams: (updateExtension: UpdateExtension<object>, node: {
    node: PmNode;
    pos: number;
}, actions: UpdateContextActions) => (state: EditorState, dispatch?: CommandDispatch | undefined) => Promise<void>;
export declare const editSelectedExtension: (editorActions: EditorActions) => boolean;
export declare const editExtension: (macroProvider: MacroProvider | null, updateExtension?: Promise<void | UpdateExtension<object>> | undefined) => Command;
/**
 * Lift content out of "open" top-level bodiedExtensions.
 * Will not work if bodiedExtensions are nested, or when bodiedExtensions are not in the top level
 */
export declare const transformSliceToRemoveOpenBodiedExtension: (slice: Slice, schema: Schema) => Slice<any>;
