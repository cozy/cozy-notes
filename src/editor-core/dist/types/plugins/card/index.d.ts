import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { CardOptions } from './types';
export type { CardOptions } from './types';
export declare const stateKey: PluginKey<any, any>;
declare const cardPlugin: (options: CardOptions & {
    platform: 'mobile' | 'web';
    fullWidthMode?: boolean;
}) => EditorPlugin;
export default cardPlugin;
