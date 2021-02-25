import { EditorView, Decoration } from 'prosemirror-view';
/**
 * Provides support for applying search match highlight decorations in batches
 */
declare class BatchDecorations {
    private rafId?;
    private addDecorations?;
    private removeDecorations?;
    stop(): void;
    /**
     * Applies the decorations needed for the current search results
     * It does so async, splitting them up into batches to help with performance
     */
    applyAllSearchDecorations(editorView: EditorView, containerElement: HTMLElement | null, addDecorations: (decorations: Decoration[]) => void, removeDecorations: (decorations: Decoration[]) => void): Promise<void>;
    private updateDecorationsBetween;
    private addDecorationsBetween;
    private removeDecorationsBetween;
    /**
     * Calculates Prosemirror start and end positions we want to apply the decorations
     * between
     * Also calculates the positions the are the start and end of the user's viewport
     * so we can apply decorations there first and work outwards
     */
    private calcDecorationPositions;
    private getStartPos;
    private getEndPos;
    /**
     * Util to batch function calls by animation frames
     * A counter will start at 0 and increment by provided value until reaches limit
     * Passed in fn receives the counter as a param, return false to skip waiting
     * for the animation frame for the next call
     */
    private batchRequests;
}
declare const batchDecorations: BatchDecorations;
export default batchDecorations;
