import { Selection } from 'prosemirror-state';
import { Command } from '../../types';
import { RelativeSelectionPos } from './types';
export declare const setDecorations: () => Command;
export declare const setSelectionRelativeToNode: (selectionRelativeToNode?: RelativeSelectionPos | undefined, selection?: Selection<any> | null | undefined) => Command;
export declare const arrowRight: Command;
export declare const arrowLeft: Command;
