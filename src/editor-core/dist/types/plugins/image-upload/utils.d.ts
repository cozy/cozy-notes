import { EditorState } from 'prosemirror-state';
import { Schema, Node } from 'prosemirror-model';
export declare const isMediaSelected: (state: EditorState) => boolean;
export declare const canInsertMedia: (state: EditorState) => boolean;
export declare const createExternalMediaNode: (url: string, schema: Schema) => Node | null;
