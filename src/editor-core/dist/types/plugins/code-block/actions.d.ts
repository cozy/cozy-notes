import { Command } from '../../types';
export declare type DomAtPos = (pos: number) => {
    node: HTMLElement;
    offset: number;
};
export declare const removeCodeBlock: Command;
export declare const changeLanguage: (language: string) => Command;
export declare const copyContentToClipboard: Command;
export declare const resetCopiedState: Command;
