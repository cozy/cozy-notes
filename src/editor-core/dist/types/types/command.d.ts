import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare type CommandDispatch = (tr: Transaction) => void;
export declare type Command = (state: EditorState, dispatch?: CommandDispatch, view?: EditorView) => boolean;
export declare type HigherOrderCommand = (command: Command) => Command;
