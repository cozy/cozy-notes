import React from 'react';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { LinkInputType } from '../../types';
export interface Props {
    view: EditorView;
    providerFactory: ProviderFactory;
    onBlur?: (type: string, url: string, title: string | undefined, displayText: string | undefined, isTabPressed?: boolean) => void;
    onSubmit: (href: string, title: string | undefined, displayText: string | undefined, inputMethod: LinkInputType) => void;
    displayText: string;
    displayUrl?: string;
}
export default class HyperlinkAddToolbar extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
