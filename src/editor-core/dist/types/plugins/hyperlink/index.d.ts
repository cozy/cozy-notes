import { EditorPlugin } from '../../types';
import { CardOptions } from '../card';
declare const hyperlinkPlugin: (options?: CardOptions | undefined) => EditorPlugin;
export type { HyperlinkState } from './pm-plugins/main';
export default hyperlinkPlugin;
