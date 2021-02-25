import { EditorView } from 'prosemirror-view';
import { ProviderFactory, CollabEventInitData, CollabEventConnectionData, CollabEventPresenceData, CollabEventTelepointerData, CollabEventRemoteData, CollabEventLocalStepData, CollabEditProvider } from '@atlaskit/editor-common';
import { PrivateCollabEditOptions } from '../types';
export declare type SynchronyEntity = {
    on: (evt: 'disconnected' | 'error', handler: (...args: any) => void) => void;
    off: (evt: 'disconnected' | 'error', handler: (...args: any) => void) => void;
};
export interface CollabHandlers {
    initHandler: (data: CollabEventInitData) => void;
    connectedHandler: (data: CollabEventConnectionData) => void;
    dataHandler: (data: CollabEventRemoteData) => void;
    presenceHandler: (data: CollabEventPresenceData) => void;
    telepointerHandler: (data: CollabEventTelepointerData) => void;
    localStepsHandler: (data: CollabEventLocalStepData) => void;
    errorHandler: (error: any) => void;
    entityHandler: ({ entity }: {
        entity: SynchronyEntity;
    }) => void;
}
export declare type Cleanup = () => void;
export declare const subscribe: (currentDeps_0: EditorView<any>, currentDeps_1: CollabEditProvider, currentDeps_2: PrivateCollabEditOptions, currentDeps_3?: ProviderFactory | undefined) => Cleanup;
