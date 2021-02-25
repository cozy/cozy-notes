import { PanelType } from '@atlaskit/adf-schema';
import { Command } from '../../types';
import { PanelOptions } from './pm-plugins/main';
export declare type DomAtPos = (pos: number) => {
    node: HTMLElement;
    offset: number;
};
export declare const removePanel: () => Command;
export declare const changePanelType: (panelType: PanelType, panelOptions?: PanelOptions, UNSAFE_allowCustomPanel?: boolean) => Command;
