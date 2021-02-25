import { Component } from 'react';
import { ProviderFactory, CardProvider } from '@atlaskit/editor-common/provider-factory';
import { InjectedIntl } from 'react-intl';
import { CardOptions } from '../card/types';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { CardPlatform } from '@atlaskit/smart-card';
export interface HyperlinkToolbarAppearanceProps {
    intl: InjectedIntl;
    editorState: EditorState;
    providerFactory: ProviderFactory;
    url: string;
    editorView?: EditorView;
    platform?: CardPlatform;
    cardOptions?: CardOptions;
}
export interface HyperlinkToolbarAppearanceState {
    supportedUrlsMap: Map<string, boolean>;
}
export declare class HyperlinkToolbarAppearance extends Component<HyperlinkToolbarAppearanceProps, HyperlinkToolbarAppearanceState> {
    state: HyperlinkToolbarAppearanceState;
    cardProvider?: CardProvider;
    private getProvider;
    private resolveUrl;
    componentDidMount: () => Promise<void>;
    componentWillReceiveProps(nextProps: HyperlinkToolbarAppearanceProps): void;
    render(): JSX.Element | null;
}
