import React from 'react';
import * as EditorImports from '../../';
export declare type EditorModule = {
    EditorContext: typeof EditorImports.EditorContext;
    WithEditorActions: typeof EditorImports.WithEditorActions;
} & {
    [x: string]: any;
};
export interface Props {
    placeholder?: string;
    isExpanded?: boolean;
    onClickToExpand?: () => void;
    renderEditor: (Editor: typeof EditorImports.Editor, modules: EditorModule) => JSX.Element;
}
export interface State {
    editorModules?: {
        [x: string]: any;
    };
}
export default class CollapsedEditor extends React.Component<Props, State> {
    static editorModules: any;
    state: State;
    componentDidMount(): void;
    loadEditorModules(): void;
    render(): JSX.Element;
}
