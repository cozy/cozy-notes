import { EditorState } from 'prosemirror-state';
import { CommandDispatch } from '../../../types';
export declare function indent(state: EditorState, dispatch?: CommandDispatch): boolean;
export declare function outdent(state: EditorState, dispatch?: CommandDispatch): boolean;
export declare function insertIndent(state: EditorState, dispatch: CommandDispatch): boolean;
export declare function insertNewlineWithIndent(state: EditorState, dispatch?: CommandDispatch): boolean;
