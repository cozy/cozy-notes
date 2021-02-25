import { pluginKey } from './plugin-key';
export const cardAction = (tr, action) => {
  return tr.setMeta(pluginKey, action);
};
export const resolveCard = url => tr => cardAction(tr, {
  type: 'RESOLVE',
  url
});
export const queueCards = requests => tr => cardAction(tr, {
  type: 'QUEUE',
  requests: requests
});
export const registerCard = info => tr => cardAction(tr, {
  type: 'REGISTER',
  info
});
export const setProvider = cardProvider => tr => cardAction(tr, {
  type: 'SET_PROVIDER',
  provider: cardProvider
});
export const showLinkToolbar = tr => cardAction(tr, {
  type: 'SHOW_LINK_TOOLBAR'
});
export const hideLinkToolbar = tr => cardAction(tr, {
  type: 'HIDE_LINK_TOOLBAR'
});