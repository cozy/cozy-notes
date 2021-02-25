import { stateKey } from './plugin-key';

const imageUploadAction = (tr, action) => {
  return tr.setMeta(stateKey, action);
};

export const startUpload = event => tr => imageUploadAction(tr, {
  name: 'START_UPLOAD',
  event
});