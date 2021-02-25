import { EditorState } from 'prosemirror-state';
import { WidthPluginState } from '../plugins/width';
/**
 * Calculates width of parent node of a nested node (inside layouts, extension)
 * If current node selection is not nested will return undefined
 */
export declare const getParentNodeWidth: (pos: number | undefined, state: EditorState, containerWidth: WidthPluginState, isFullWidthModeEnabled?: boolean | undefined) => any;
