import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { TableDecorations } from '../types';
export declare const updatePluginStateDecorations: (state: EditorState<any>, decorations: Decoration[], key: TableDecorations) => DecorationSet;
