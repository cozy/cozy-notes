import { Plugin } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
export declare const createPlugin: (dispatch: Dispatch, reactContext: () => {
    [key: string]: any;
}, useLongPressSelection?: boolean) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
