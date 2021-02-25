import { EditorPlugin } from '../../types';
interface BreakoutPluginOptions {
    allowBreakoutButton?: boolean;
}
declare const breakoutPlugin: (options?: BreakoutPluginOptions | undefined) => EditorPlugin;
export default breakoutPlugin;
