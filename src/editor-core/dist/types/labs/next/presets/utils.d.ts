import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EditorPresetProps } from './types';
export declare const addExcludesFromProviderFactory: (providerFactory: ProviderFactory, excludes?: EditorPresetProps['excludes']) => Set<string>;
