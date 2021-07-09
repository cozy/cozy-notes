import { PluginKey } from 'prosemirror-state';
import { inlineCard, blockCard, embedCard } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { floatingToolbar } from './toolbar';
import { CardOptions } from '@atlaskit/editor-common';

export const stateKey = new PluginKey('cardPlugin');

const cardPlugin = (
  options: CardOptions & {
    platform: 'mobile' | 'web';
    fullWidthMode?: boolean;
  },
): EditorPlugin => {
  return {
    name: 'card',

    nodes() {
      const nodes = [
        { name: 'inlineCard', node: inlineCard },
        { name: 'blockCard', node: blockCard },
      ];

      if (options.allowEmbeds) {
        nodes.push({
          name: 'embedCard',
          node: embedCard,
        });
      }

      return nodes;
    },

    pmPlugins() {
      const allowResizing = options.allowResizing ?? true;
      const useAlternativePreloader = options.useAlternativePreloader ?? true;
      return [
        {
          name: 'card',
          plugin: createPlugin(
            options.platform,
            allowResizing,
            useAlternativePreloader,
            options.fullWidthMode,
          ),
        },
      ];
    },

    pluginsOptions: {
      floatingToolbar: floatingToolbar(options, options.platform),
    },
  };
};

export default cardPlugin;
