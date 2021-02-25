import { Config, CollabEvent, PubSubClient, DocumentResponse, MixedResponse } from './types';
import { Step } from 'prosemirror-transform';
export interface RequestOptions {
    method: 'GET' | 'POST';
    body?: string;
    headers?: any;
}
export declare class Channel {
    private eventEmitter;
    private pubSubClient;
    private config;
    private isSending?;
    private debounced?;
    constructor(config: Config, pubSubClient: PubSubClient);
    /**
     * Get initial document from service
     */
    getDocument(): Promise<DocumentResponse>;
    /**
     * Connect to pubsub to start receiving events
     */
    connect(): Promise<void>;
    private debounce;
    /**
     * Send steps to service
     */
    sendSteps(state: any, getState: () => any, localSteps?: Array<Step>): Promise<void>;
    /**
     * Get steps from version x to latest
     */
    getSteps(version: number): Promise<MixedResponse>;
    /**
     * Send telepointer
     */
    sendTelepointer(data: any): Promise<void>;
    /**
     * Subscribe to events emitted by this channel
     */
    on(evt: CollabEvent, handler: (...args: any) => void): this;
    /**
     * Unsubscribe from events emitted by this channel
     */
    off(evt: CollabEvent, handler: (...args: any) => void): this;
    /**
     * Emit events to subscribers
     */
    private emit;
}
