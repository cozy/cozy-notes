import { MediaProvider } from '@atlaskit/editor-common/provider-factory';
import { EditorPlugin } from '../../types';
import { MediaState } from './pm-plugins/main';
import { CustomMediaPicker, MediaOptions } from './types';
export type { MediaState, MediaProvider, CustomMediaPicker };
export { insertMediaSingleNode } from './utils/media-single';
declare const mediaPlugin: (options?: MediaOptions | undefined) => EditorPlugin;
export default mediaPlugin;
