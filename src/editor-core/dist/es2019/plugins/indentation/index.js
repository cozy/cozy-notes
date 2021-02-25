import { indentation } from '@atlaskit/adf-schema';
import { keymapPlugin } from './pm-plugins/keymap';

const indentationPlugin = () => ({
  name: 'indentation',

  marks() {
    return [{
      name: 'indentation',
      mark: indentation
    }];
  },

  pmPlugins() {
    return [{
      name: 'indentationKeymap',
      plugin: () => keymapPlugin()
    }];
  }

});

export default indentationPlugin;