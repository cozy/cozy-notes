import React from 'react';
import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { MediaLinkingState } from '../pm-plugins/linking';
export interface LinkingToolbarProps {
    editorState: EditorState;
    intl: InjectedIntl;
    mediaLinkingState: MediaLinkingState;
    onAddLink: React.MouseEventHandler;
    onEditLink: React.MouseEventHandler;
    onOpenLink: React.MouseEventHandler;
    showSeparatorLeft: boolean;
}
export declare const LinkToolbarAppearance: React.FC<LinkingToolbarProps>;
