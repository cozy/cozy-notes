import { Schema } from 'prosemirror-model';
import { Plugin, Transaction, EditorState } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EventDispatcher, Dispatch } from '../event-dispatcher';
import { MarkConfig, NodeConfig } from '../types/pm-config';
import { EditorReactContext } from '../types/editor-react-context';
export declare type LightPMPluginFactoryParams = {
    schema: Schema;
    dispatch: Dispatch;
    eventDispatcher: EventDispatcher;
    providerFactory: ProviderFactory;
    props: {};
    prevProps?: {};
    portalProviderAPI: any;
    reactContext: () => EditorReactContext;
    dispatchAnalyticsEvent: any;
};
export declare type LightPMPluginFactory = (params: LightPMPluginFactoryParams) => Plugin | undefined;
export declare type LightPMPlugin = {
    name: string;
    plugin: LightPMPluginFactory;
};
export declare type OnEditorViewStateUpdated = (props: {
    readonly transaction: Readonly<Transaction>;
    readonly oldEditorState: Readonly<EditorState>;
    readonly newEditorState: Readonly<EditorState>;
}) => void;
export interface LightEditorPlugin {
    name: string;
    marks?: () => MarkConfig[];
    nodes?: () => NodeConfig[];
    pmPlugins?: (pluginOptions?: any) => Array<LightPMPlugin>;
    pluginsOptions?: Record<string, any>;
    onEditorViewStateUpdated?: OnEditorViewStateUpdated;
}
