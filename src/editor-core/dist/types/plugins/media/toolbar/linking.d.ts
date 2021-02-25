import { EditorState } from 'prosemirror-state';
import { InjectedIntl } from 'react-intl';
import { ProviderFactory } from '@atlaskit/editor-common';
import { FloatingToolbarConfig } from '../../floating-toolbar/types';
import { MediaLinkingState } from '../pm-plugins/linking';
import { MediaToolbarBaseConfig } from '../types';
export declare function shouldShowMediaLinkToolbar(editorState: EditorState): boolean;
export declare const getLinkingToolbar: (toolbarBaseConfig: MediaToolbarBaseConfig, mediaLinkingState: MediaLinkingState, state: EditorState, intl: InjectedIntl, providerFactory?: ProviderFactory | undefined) => FloatingToolbarConfig | undefined;
