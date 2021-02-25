import { createPlugin } from './pm-plugins/main';

const pastePlugin = ({
  cardOptions,
  sanitizePrivateContent,
  predictableLists
}) => ({
  name: 'paste',

  pmPlugins() {
    return [{
      name: 'paste',
      plugin: ({
        schema,
        providerFactory
      }) => createPlugin(schema, cardOptions, sanitizePrivateContent, predictableLists, providerFactory)
    }];
  }

});

export default pastePlugin;