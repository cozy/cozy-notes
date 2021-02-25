import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
export interface Props {
    editorView: EditorView;
    node: PMNode;
    providerFactory?: ProviderFactory;
    handleContentDOMRef: (node: HTMLElement | null) => void;
    extensionHandlers: ExtensionHandlers;
}
export default class Extension extends Component<Props, any> {
    static displayName: string;
    private providerFactory;
    constructor(props: Props);
    componentWillUnmount(): void;
    private renderWithProvider;
    render(): JSX.Element;
}
