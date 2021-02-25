import { extension, extensionWithLocalId, bodiedExtension, bodiedExtensionWithLocalId, inlineExtension, inlineExtensionWithLocalId } from '@atlaskit/adf-schema';
import { createPlugin } from './pm-plugins/main';
import keymapPlugin from './pm-plugins/keymap';
import { createPlugin as createUniqueIdPlugin } from './pm-plugins/unique-id';
import { getToolbarConfig } from './toolbar';
import { getContextPanel } from './context-panel';

const extensionPlugin = (options = {}) => ({
  name: 'extension',

  nodes() {
    return [{
      name: 'extension',
      node: options.allowLocalIdGeneration ? extensionWithLocalId : extension
    }, {
      name: 'bodiedExtension',
      node: options.allowLocalIdGeneration ? bodiedExtensionWithLocalId : bodiedExtension
    }, {
      name: 'inlineExtension',
      node: options.allowLocalIdGeneration ? inlineExtensionWithLocalId : inlineExtension
    }];
  },

  pmPlugins() {
    return [{
      name: 'extension',
      plugin: ({
        dispatch,
        providerFactory,
        portalProviderAPI,
        eventDispatcher
      }) => {
        const extensionHandlers = options.extensionHandlers || {};
        return createPlugin(dispatch, providerFactory, extensionHandlers, portalProviderAPI, eventDispatcher, options.useLongPressSelection);
      }
    }, {
      name: 'extensionKeymap',
      plugin: keymapPlugin
    }, {
      name: 'extensionUniqueId',
      plugin: () => options.allowLocalIdGeneration ? createUniqueIdPlugin() : undefined
    }];
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig(options.breakoutEnabled),
    contextPanel: getContextPanel(options.allowAutoSave)
  }
});

export default extensionPlugin;