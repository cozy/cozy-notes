import { PureComponent } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView?: EditorView;
    isDisabled?: boolean;
}
export interface State {
    disabled: boolean;
}
export default class ToolbarMention extends PureComponent<Props> {
    render(): JSX.Element;
    private handleInsertMention;
}
