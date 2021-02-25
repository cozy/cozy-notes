import { Plugin } from 'prosemirror-state';
import { Dispatch, EventDispatcher } from '../../../../event-dispatcher';
export declare const createPlugin: (dispatch: Dispatch, eventDispatcher: EventDispatcher, initialState?: () => never[]) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
