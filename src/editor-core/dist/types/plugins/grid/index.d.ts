import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { RichMediaLayout as MediaSingleLayout } from '@atlaskit/adf-schema';
import { GridType } from './types';
import { EventDispatcher } from '../../event-dispatcher';
export declare const stateKey: PluginKey<any, any>;
export declare const GRID_SIZE = 12;
export declare type Highlights = Array<'wide' | 'full-width' | number>;
export declare const createDisplayGrid: (eventDispatcher: EventDispatcher) => (show: boolean, type: GridType, highlight?: number[] | string[]) => void;
export declare const gridTypeForLayout: (layout: MediaSingleLayout) => GridType;
interface GridPluginOptions {
    shouldCalcBreakoutGridLines?: boolean;
}
declare const gridPlugin: (options?: GridPluginOptions | undefined) => EditorPlugin;
export default gridPlugin;
export { GRID_GUTTER } from './styles';
