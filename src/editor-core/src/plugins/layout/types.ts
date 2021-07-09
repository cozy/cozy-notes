import { Slice } from 'prosemirror-model';
import { LongPressSelectionPluginOptions } from '../selection/types';

export interface LayoutPluginOptions extends LongPressSelectionPluginOptions {
  allowBreakout?: boolean;
  UNSAFE_addSidebarLayouts?: boolean;
}

export type PresetLayout =
  | 'two_equal'
  | 'three_equal'
  | 'two_right_sidebar'
  | 'two_left_sidebar'
  | 'three_with_sidebars';

export interface Change {
  from: number;
  to: number;
  slice: Slice;
}
