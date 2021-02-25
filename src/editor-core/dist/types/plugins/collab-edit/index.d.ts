import { EditorPlugin } from '../../types';
import { pluginKey } from './plugin';
import { CollabEditOptions, PrivateCollabEditOptions } from './types';
export { CollabProvider } from './provider';
export type { CollabEditProvider } from './provider';
export { pluginKey };
export type { CollabEditOptions };
declare const collabEditPlugin: (options: PrivateCollabEditOptions) => EditorPlugin;
export default collabEditPlugin;
