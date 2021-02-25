import { Command } from '../../types/command';
import { FloatingToolbarHandler, FloatingToolbarItem } from '../floating-toolbar/types';
import { ToolbarMenuConfig, ToolbarMenuState, ToolbarMenuContext } from './types';
export declare const messages: {
    tableOptions: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    headerRow: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    headerColumn: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    numberedColumn: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const getToolbarMenuConfig: (config: ToolbarMenuConfig, state: ToolbarMenuState, { formatMessage }: ToolbarMenuContext) => FloatingToolbarItem<Command>;
export declare const getToolbarConfig: FloatingToolbarHandler;
