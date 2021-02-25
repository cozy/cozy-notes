import { Plugin, PluginKey } from 'prosemirror-state';
import { BlockType } from '../types';
export declare type BlockTypeState = {
    currentBlockType: BlockType;
    blockTypesDisabled: boolean;
    availableBlockTypes: BlockType[];
    availableWrapperBlockTypes: BlockType[];
};
export declare const pluginKey: PluginKey<any, any>;
export declare const createPlugin: (dispatch: (eventName: string | PluginKey, data: any) => void, lastNodeMustBeParagraph?: boolean | undefined) => Plugin<any, any>;
