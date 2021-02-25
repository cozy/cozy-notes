import React from 'react';
import { EditorAppearanceComponentProps } from '../../types';
export interface ChromelessEditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export default class Editor extends React.Component<EditorAppearanceComponentProps, any> {
    static displayName: string;
    private appearance;
    private containerElement;
    private renderChrome;
    render(): JSX.Element;
}
