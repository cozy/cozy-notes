import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { pluginKey } from './plugin-key';
const factory = pluginFactory(pluginKey, reducer, {
  mapping(tr, state) {
    const {
      positions: previousPositions
    } = state;

    if (!previousPositions) {
      return state;
    }

    const positions = { ...previousPositions
    };

    for (const key in positions) {
      positions[key] = tr.mapping.map(positions[key]);
    }

    return { ...state,
      positions
    };
  }

});
export const createPluginState = factory.createPluginState;
export const createCommand = factory.createCommand;
export const getPluginState = factory.getPluginState;