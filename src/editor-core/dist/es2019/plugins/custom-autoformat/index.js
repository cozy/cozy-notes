import { Plugin as PMPlugin } from 'prosemirror-state';
import { keydownHandler } from 'prosemirror-keymap';
import reducers from './reducers';
import { triggerInputRule } from './input-rules';
import { completeReplacements, buildHandler } from './doc';
import { getPluginState, pluginKey } from './utils';
export const createPMPlugin = ({
  providerFactory
}) => {
  const rules = [];
  return new PMPlugin({
    state: {
      init() {
        return {
          resolving: [],
          matches: []
        };
      },

      apply(tr, prevPluginState) {
        if (!prevPluginState) {
          return prevPluginState;
        } // remap positions


        const remappedPluginState = { ...prevPluginState,
          resolving: prevPluginState.resolving.map(candidate => ({ ...candidate,
            start: tr.mapping.map(candidate.start),
            end: tr.mapping.map(candidate.end, -1)
          }))
        };
        const meta = tr.getMeta(pluginKey);

        if (!meta) {
          return remappedPluginState;
        }

        return reducers(remappedPluginState, meta);
      }

    },
    props: {
      handleTextInput(view, from, to, text) {
        triggerInputRule(view, rules, from, to, text);
        return false;
      },

      handleKeyDown: keydownHandler({
        Enter: (_state, _dispatch, view) => {
          triggerInputRule(view, rules, view.state.selection.from, view.state.selection.to, '');
          return false;
        }
      })
    },

    view() {
      const handleProvider = (name, provider) => {
        if (name !== 'autoformattingProvider' || !provider) {
          return;
        }

        provider.then(async autoformattingProvider => {
          const ruleset = await autoformattingProvider.getRules();
          Object.keys(ruleset).forEach(rule => {
            const inputRule = {
              matchTyping: new RegExp('(\\s+|^)' + rule + '(\\s)$'),
              matchEnter: new RegExp('(\\s+|^)' + rule + '()$'),
              handler: buildHandler(rule, ruleset[rule])
            };
            rules.push(inputRule);
          });
        });
      };

      providerFactory.subscribe('autoformattingProvider', handleProvider);
      return {
        update(view) {
          const currentState = getPluginState(view.state);

          if (!currentState) {
            return;
          } // make replacements in document for finished autoformats


          if (currentState.matches) {
            completeReplacements(view, currentState);
          }
        },

        destroy() {
          providerFactory.unsubscribe('autoformattingProvider', handleProvider);
        }

      };
    },

    key: pluginKey
  });
};

const customAutoformatPlugin = () => ({
  name: 'customAutoformat',

  pmPlugins() {
    return [{
      name: 'customAutoformat',
      plugin: createPMPlugin
    }];
  }

});

export default customAutoformatPlugin;