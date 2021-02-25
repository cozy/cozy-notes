import React from 'react';
import PropTypes from 'prop-types';
import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { CardContext, CardPlatform } from '@atlaskit/smart-card';
import { EditorView } from 'prosemirror-view';
import { CardAppearance } from '@atlaskit/editor-common/provider-factory';
export interface LinkToolbarAppearanceProps {
    intl: InjectedIntl;
    currentAppearance?: CardAppearance;
    editorState: EditorState;
    editorView?: EditorView;
    url?: string;
    allowEmbeds?: boolean;
    platform?: CardPlatform;
}
export declare class LinkToolbarAppearance extends React.Component<LinkToolbarAppearanceProps, {}> {
    static contextTypes: {
        contextAdapter: PropTypes.Requireable<any>;
    };
    renderDropdown: (view?: EditorView<any> | undefined, cardContext?: CardContext | undefined) => JSX.Element;
    render(): JSX.Element;
}
