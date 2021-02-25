import { pluginKey } from './plugin-key';
export function getParticipantsCount(state) {
  if (!state) {
    return 1;
  }

  const pluginState = pluginKey.getState(state);
  return pluginState && pluginState.participants ? pluginState.participants.size() : 1;
}