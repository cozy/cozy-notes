import { FloatingToolbarConfig, FloatingToolbarItem } from './../floating-toolbar/types';
import { PanelPluginOptions } from './types';
import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { Command } from '../../types';
import { ProviderFactory } from '@atlaskit/editor-common';
import { FormattedMessage } from 'react-intl';
export declare const messages: {
    info: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    note: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    success: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    warning: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    error: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    emoji: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    backgroundColor: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const getToolbarItems: (formatMessage: (messageDescriptor: FormattedMessage.MessageDescriptor) => string, panelNodeType: NodeType, isCustomPanelEnabled: boolean, providerFactory: ProviderFactory, activePanelType?: string | undefined, activePanelColor?: string | undefined, activePanelIcon?: string | undefined) => FloatingToolbarItem<Command>[];
export declare const getToolbarConfig: (state: EditorState, intl: InjectedIntl, options: PanelPluginOptions | undefined, providerFactory: ProviderFactory) => FloatingToolbarConfig | undefined;
