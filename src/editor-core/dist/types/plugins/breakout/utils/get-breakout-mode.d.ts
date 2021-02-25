import { EditorState } from 'prosemirror-state';
import { BreakoutMode } from '../commands/set-breakout-mode';
/**
 * Get the current mode of the breakout at the selection
 * @param state Current EditorState
 */
export declare function getBreakoutMode(state: EditorState): BreakoutMode | undefined;
