import { Slice } from 'prosemirror-model';
import { PresetLayout } from '../types';
export declare type LayoutState = {
    pos: number | null;
    allowBreakout: boolean;
    addSidebarLayouts: boolean;
    selectedLayout: PresetLayout | undefined;
};
export declare type Change = {
    from: number;
    to: number;
    slice: Slice;
};
