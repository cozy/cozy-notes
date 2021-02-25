import { Selection } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { EditorPlugin } from '../../types';
import { FloatingToolbarConfig } from './types';
declare type ConfigWithNodeInfo = {
    config: FloatingToolbarConfig | undefined;
    pos: number;
    node: Node;
};
export declare const getRelevantConfig: (selection: Selection<any>, configs: Array<FloatingToolbarConfig>) => ConfigWithNodeInfo | undefined;
declare const floatingToolbarPlugin: () => EditorPlugin;
export default floatingToolbarPlugin;
