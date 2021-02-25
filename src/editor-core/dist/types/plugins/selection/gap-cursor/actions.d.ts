import { EditorState } from 'prosemirror-state';
import { Direction } from './direction';
import { Side } from './selection';
import { Command } from '../../../types';
export declare type DirectionString = 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward';
export declare const arrow: (dir: Direction, endOfTextblock?: ((dir: DirectionString, state?: EditorState<any> | undefined) => boolean) | undefined) => Command;
export declare const deleteNode: (dir: Direction) => Command;
export declare const setGapCursorAtPos: (position: number, side?: Side) => Command;
export declare const setCursorForTopLevelBlocks: (event: React.MouseEvent<any>, editorRef: HTMLElement, posAtCoords: (coords: {
    left: number;
    top: number;
}) => {
    pos: number;
    inside: number;
} | null | void, editorFocused: boolean) => Command;
