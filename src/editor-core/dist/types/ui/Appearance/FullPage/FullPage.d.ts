import React from 'react';
import { EditorAppearanceComponentProps } from '../../../types';
interface FullPageEditorState {
    showKeyline: boolean;
}
export declare class FullPageEditor extends React.Component<EditorAppearanceComponentProps, FullPageEditorState> {
    state: FullPageEditorState;
    static displayName: string;
    private scrollContainer;
    private contentArea;
    private scheduledKeylineUpdate;
    private contentAreaRef;
    private scrollContainerRef;
    private updateToolbarKeyline;
    private handleResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
