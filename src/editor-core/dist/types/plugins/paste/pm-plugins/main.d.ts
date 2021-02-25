import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { CardOptions } from '../../card';
export declare const stateKey: PluginKey<any, any>;
export { md } from '../md';
export declare function createPlugin(schema: Schema, cardOptions?: CardOptions, sanitizePrivateContent?: boolean, predictableLists?: boolean, providerFactory?: ProviderFactory): Plugin<any, any>;
