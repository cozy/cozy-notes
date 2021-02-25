import { EditorView } from 'prosemirror-view';
import { Transaction } from 'prosemirror-state';
import { Transformer } from '@atlaskit/editor-common';
import { EditorSharedConfig } from '../../context/shared-config';
export declare function createDispatchTransaction(editorSharedConfig: EditorSharedConfig): (transaction: Transaction) => void;
export declare function getEditorValue(editorView: EditorView, transformer?: Transformer<any>): any;
