import { Plugin } from 'prosemirror-state';
import { CardPlatform } from '@atlaskit/smart-card';
import { PMPluginFactoryParams } from '../../../types';
export { pluginKey } from './plugin-key';
export declare const createPlugin: (platform: CardPlatform, allowResizing?: boolean | undefined, fullWidthMode?: boolean | undefined) => ({ portalProviderAPI, eventDispatcher, providerFactory, dispatchAnalyticsEvent, }: PMPluginFactoryParams) => Plugin<any, any>;
