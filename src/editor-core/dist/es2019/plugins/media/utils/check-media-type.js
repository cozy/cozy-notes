import { getMediaClient } from '@atlaskit/media-client';
export const checkMediaType = async (mediaNode, mediaClientConfig) => {
  if (mediaNode.attrs.type === 'external') {
    return 'external';
  }

  if (!mediaNode.attrs.id) {
    return;
  }

  try {
    const fileState = await getMediaClient(mediaClientConfig).file.getCurrentState(mediaNode.attrs.id, {
      collectionName: mediaNode.attrs.collection
    });

    if (fileState && fileState.status !== 'error') {
      return fileState.mediaType;
    }
  } catch (err) {// return undefined in case of media client error
  }
};