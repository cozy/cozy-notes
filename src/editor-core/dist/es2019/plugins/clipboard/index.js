import { createPlugin } from './pm-plugins/main';

const clipboard = () => ({
  name: 'clipboard',

  pmPlugins() {
    return [{
      name: 'clipboard',
      plugin: options => createPlugin(options)
    }];
  }

});

export default clipboard;