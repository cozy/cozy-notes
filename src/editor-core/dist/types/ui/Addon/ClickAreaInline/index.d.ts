import React from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView?: EditorView;
}
export default class ClickAreaInline extends React.Component<Props> {
    private handleClick;
    render(): JSX.Element;
}
