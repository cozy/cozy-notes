import { EditorState } from 'prosemirror-state';
import { AlignmentState } from '../pm-plugins/types';
export declare const getActiveAlignment: (state: EditorState) => AlignmentState | undefined;
