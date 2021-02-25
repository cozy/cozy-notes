import { PluginKey } from 'prosemirror-state';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
export const mobileScrollPluginKey = new PluginKey('mobileScroll');
export const {
  createPluginState,
  getPluginState,
  createCommand
} = pluginFactory(mobileScrollPluginKey, reducer);