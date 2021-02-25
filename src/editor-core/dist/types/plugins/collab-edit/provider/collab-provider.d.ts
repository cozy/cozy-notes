import { Transaction, EditorState } from 'prosemirror-state';
import { CollabEditProvider, CollabEvent, PubSubClient, Config } from './types';
export declare class CollabProvider implements CollabEditProvider {
    private eventEmitter;
    private channel;
    private queue;
    private config;
    private getState;
    private participants;
    constructor(config: Config, pubSubClient: PubSubClient);
    initialize(getState: () => any): this;
    /**
     * Send steps from transaction to other participants
     */
    send(tr: Transaction, _oldState: EditorState, newState: EditorState): void;
    /**
     * Send messages, such as telepointers, to other participants.
     */
    sendMessage(data: any): void;
    private queueTimeout?;
    private pauseQueue;
    private queueData;
    private catchup;
    private processQeueue;
    private processRemoteData;
    private onReceiveData;
    private onReceiveTelepointer;
    private updateParticipant;
    /**
     * Emit events to subscribers
     */
    private emit;
    /**
     * Subscribe to events emitted by this provider
     */
    on(evt: CollabEvent, handler: (...args: any) => void): this;
    /**
     * Unsubscribe from events emitted by this provider
     */
    off(evt: CollabEvent, handler: (...args: any) => void): this;
    /**
     * Unsubscribe from all events emitted by this provider.
     */
    unsubscribeAll(evt: CollabEvent): this;
}
