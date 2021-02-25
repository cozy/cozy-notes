import React from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView?: EditorView;
    children?: any;
}
export default class ClickAreaBlock extends React.Component<Props> {
    private handleClick;
    render(): JSX.Element;
}
