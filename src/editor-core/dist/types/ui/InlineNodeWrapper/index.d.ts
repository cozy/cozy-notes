import React from 'react';
/**
 * @see ED-6102: Deleting inline nodes doesn't work properly on Android
 * @see discussion here: https://github.com/ProseMirror/prosemirror/issues/903
 *
 * Implemented a workaround, namely wrapping affected inline nodes into an inline block + block using following helpers.
 * As outcome deletion is handled properly, albeit cursor is still jumping impredictably
 * (this moderately affects the editing experience on Android)
 */
export declare function createMobileInlineDomRef(): HTMLSpanElement;
export declare const InlineNodeInnerWrapper: React.ComponentClass<React.HTMLAttributes<{}>>;
declare const InlineNodeWrapper: React.StatelessComponent<{
    useInlineWrapper?: boolean;
}>;
export default InlineNodeWrapper;
