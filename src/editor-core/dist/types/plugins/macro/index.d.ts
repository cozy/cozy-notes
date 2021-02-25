import { Plugin } from 'prosemirror-state';
import { MacroProvider, ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { Dispatch } from '../../event-dispatcher';
import { EditorPlugin } from '../../types';
export type { MacroProvider, MacroAttributes, ExtensionType, } from '@atlaskit/editor-common/provider-factory';
export { insertMacroFromMacroBrowser, resolveMacro, runMacroAutoConvert, setMacroProvider, } from './actions';
export declare type MacroState = {
    macroProvider: MacroProvider | null;
};
export declare const createPlugin: (dispatch: Dispatch, providerFactory: ProviderFactory) => Plugin<any, any>;
declare const macroPlugin: () => EditorPlugin;
export default macroPlugin;
