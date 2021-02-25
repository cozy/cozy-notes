import { CollabEditProvider } from '@atlaskit/editor-common';
import { Transaction, EditorState } from 'prosemirror-state';
declare type Props = {
    transaction: Transaction;
    oldEditorState: EditorState;
    newEditorState: EditorState;
};
export declare const sendTransaction: ({ transaction, oldEditorState, newEditorState, }: Props) => (provider: CollabEditProvider) => void;
export {};
