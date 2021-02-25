import { Transaction } from 'prosemirror-state';
export declare const openHelpCommand: (tr: Transaction, dispatch?: Function | undefined) => boolean;
export declare const closeHelpCommand: (tr: Transaction, dispatch: Function) => void;
export declare const stopPropagationCommand: (e: Event) => void;
