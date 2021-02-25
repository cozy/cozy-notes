import { Dispatch } from '../../../event-dispatcher';
import { Transaction } from 'prosemirror-state';
export declare type AlignmentState = 'start' | 'end' | 'center';
export declare type AlignmentPluginState = {
    align: AlignmentState;
    isEnabled?: boolean;
};
export declare type ActionHandlerParams = {
    dispatch: Dispatch;
    pluginState: AlignmentPluginState;
    tr: Transaction;
    params?: {
        align?: string;
        disabled?: boolean;
    };
};
