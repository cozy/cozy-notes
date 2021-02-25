import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { ExtensionHandlers, getNodeRenderer, ExtensionProvider } from '@atlaskit/editor-common';
export interface Props {
    editorView: EditorView;
    node: PMNode;
    handleContentDOMRef: (node: HTMLElement | null) => void;
    extensionHandlers: ExtensionHandlers;
    extensionProvider?: Promise<ExtensionProvider>;
}
export interface State {
    extensionProvider?: ExtensionProvider;
    extensionHandlersFromProvider?: ExtensionHandlers;
}
export default class ExtensionComponent extends Component<Props, State> {
    state: State;
    mounted: boolean;
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    getNodeRenderer: typeof getNodeRenderer;
    render(): JSX.Element | null;
    private setStateFromPromise;
    private tryExtensionHandler;
    private handleExtension;
}
