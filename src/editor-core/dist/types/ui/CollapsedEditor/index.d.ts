import React from 'react';
import Editor from '../../editor';
export interface Props {
    placeholder?: string;
    children?: any;
    isExpanded?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onExpand?: () => void;
}
export interface State {
}
export default class CollapsedEditor extends React.Component<Props, State> {
    editorComponent?: Editor;
    shouldTriggerExpandEvent?: boolean;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    componentDidUpdate(): void;
    handleEditorRef: (editorRef?: Editor | undefined, editorRefCallback?: any) => void;
    render(): JSX.Element;
}
