import React from 'react';
import { EditorView, NodeView } from 'prosemirror-view';
import { PanelType, PanelAttributes } from '@atlaskit/adf-schema';
import { getPosHandler } from '../../../nodeviews/';
import { ProviderFactory } from '@atlaskit/editor-common';
import { PanelPluginOptions } from '../types';
export declare const panelIcons: {
    [key in PanelType]: React.ComponentType<{
        label: string;
    }>;
};
interface PanelIconAttributes {
    panelAttributes: PanelAttributes;
    providerFactory?: ProviderFactory;
    allowCustomPanel?: boolean;
}
export declare const PanelIcon: React.FC<PanelIconAttributes>;
export declare const getPanelNodeView: (pluginOptions: PanelPluginOptions, providerFactory?: ProviderFactory | undefined) => (node: any, view: EditorView, getPos: getPosHandler) => NodeView;
export {};
