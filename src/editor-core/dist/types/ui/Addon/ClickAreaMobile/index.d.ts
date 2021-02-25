import React from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView?: EditorView;
    minHeight: number;
    children?: any;
}
/**
 * Click Area is responsible for improving UX by ensuring the user
 * can always tap beneath the content area, to insert more content.
 *
 * This is achieved by inserting a new empty paragraph at the end of
 * the document (if one doesn't already exist).
 *
 * This is particularly important when the content exceeds the visible
 * viewport height, and if the last content node captures text selection
 * e.g. table, layouts, codeblock, etc.
 *
 * This relies on the Scroll Gutter plugin which inserts additional
 * whitespace at the end of the document when it overflows the viewport.
 */
export default class ClickAreaMobile extends React.Component<Props> {
    private clickElementRef;
    private handleClick;
    render(): JSX.Element;
}
