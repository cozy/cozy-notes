import { Plugin as PMPlugin } from 'prosemirror-state';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
export declare const createPMPlugin: ({ providerFactory }: PMPluginFactoryParams) => PMPlugin<any, any>;
declare const customAutoformatPlugin: () => EditorPlugin;
export default customAutoformatPlugin;
