import React from 'react';
import { EditorView } from 'prosemirror-view';
export interface MobileEditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export declare type MobileAppearanceProps = React.PropsWithChildren<{
    editorView: EditorView | null;
    maxHeight?: number;
}>;
export declare function MobileAppearance({ editorView, maxHeight, children, }: MobileAppearanceProps): JSX.Element;
