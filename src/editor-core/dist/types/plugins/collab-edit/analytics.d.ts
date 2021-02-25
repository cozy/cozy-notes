import { EditorState, Transaction } from 'prosemirror-state';
export declare const addSynchronyErrorAnalytics: (state: EditorState, tr: Transaction) => (error: Error) => Transaction<any>;
export declare type EntityEventType = 'error' | 'disconnected';
export declare const addSynchronyEntityAnalytics: (state: EditorState, tr: Transaction) => (type: EntityEventType) => Transaction<any>;
