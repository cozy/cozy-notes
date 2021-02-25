import { Plugin } from 'prosemirror-state';
import { PMPluginFactoryParams } from '../../../types';
export declare const createPlugin: ({ dispatch, providerFactory, }: PMPluginFactoryParams) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
