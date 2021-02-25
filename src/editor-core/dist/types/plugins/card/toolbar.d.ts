import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { Command } from '../../types';
import { FloatingToolbarConfig } from '../floating-toolbar/types';
import { CardOptions } from './types';
import { ProviderFactory } from '@atlaskit/editor-common';
export declare const removeCard: Command;
export declare const visitCardLink: Command;
export declare const floatingToolbar: (cardOptions: CardOptions, platform?: "mobile" | "web" | undefined) => (state: EditorState, intl: InjectedIntl, providerFactory: ProviderFactory) => FloatingToolbarConfig | undefined;
