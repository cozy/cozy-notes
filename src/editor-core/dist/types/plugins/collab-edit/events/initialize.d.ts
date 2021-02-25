import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { CollabEditProvider } from '../provider';
import { PrivateCollabEditOptions } from '../types';
import { Cleanup } from './handlers';
declare type Props = {
    view: EditorView;
    options: PrivateCollabEditOptions;
    providerFactory: ProviderFactory;
};
export declare const initialize: ({ options, providerFactory, view }: Props) => (provider: CollabEditProvider) => Cleanup;
export {};
