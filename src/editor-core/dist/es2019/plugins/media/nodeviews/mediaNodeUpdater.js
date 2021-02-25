import _defineProperty from "@babel/runtime/helpers/defineProperty";
import uuidV4 from 'uuid/v4';
import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH } from '@atlaskit/editor-common';
import { getMediaClient, isMediaBlobUrl, getAttrsFromUrl } from '@atlaskit/media-client';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../../analytics';
import { replaceExternalMedia, updateAllMediaNodesAttrs, updateMediaNodeAttrs } from '../commands/helpers';
export class MediaNodeUpdater {
  constructor(props) {
    _defineProperty(this, "updateContextId", async () => {
      const attrs = this.getAttrs();

      if (!attrs || attrs.type !== 'file') {
        return;
      }

      const {
        id
      } = attrs;
      const objectId = await this.getObjectId();
      updateAllMediaNodesAttrs(id, {
        __contextId: objectId
      }, this.props.isMediaSingle)(this.props.view.state, this.props.view.dispatch);
    });

    _defineProperty(this, "hasFileAttributesDefined", () => {
      const attrs = this.getAttrs();
      return attrs && attrs.type === 'file' && attrs.__fileName && attrs.__fileMimeType && attrs.__fileSize && attrs.__contextId;
    });

    _defineProperty(this, "updateFileAttrs", async (isMediaSingle = true) => {
      const attrs = this.getAttrs();
      const mediaProvider = await this.props.mediaProvider;

      if (!mediaProvider || !mediaProvider.uploadParams || !attrs || attrs.type !== 'file' || this.hasFileAttributesDefined()) {
        return;
      }

      const mediaClientConfig = mediaProvider.viewMediaClientConfig;
      const mediaClient = getMediaClient(mediaClientConfig);
      const options = {
        collectionName: attrs.collection
      };
      let fileState;

      try {
        fileState = await mediaClient.file.getCurrentState(attrs.id, options);

        if (fileState.status === 'error') {
          return;
        }
      } catch (err) {
        return;
      }

      const contextId = this.getNodeContextId() || (await this.getObjectId());
      const {
        name,
        mimeType,
        size
      } = fileState;
      const newAttrs = {
        __fileName: name,
        __fileMimeType: mimeType,
        __fileSize: size,
        __contextId: contextId
      };
      const attrsChanged = hasPrivateAttrsChanged(attrs, newAttrs);

      if (attrsChanged) {
        // TODO [MS-2258]: we should pass this.props.isMediaSingle and remove hardcoded "true"
        updateAllMediaNodesAttrs(attrs.id, newAttrs, isMediaSingle)(this.props.view.state, this.props.view.dispatch);
      }
    });

    _defineProperty(this, "getAttrs", () => {
      const {
        attrs
      } = this.props.node;

      if (attrs) {
        return attrs;
      }

      return undefined;
    });

    _defineProperty(this, "getObjectId", async () => {
      const contextIdentifierProvider = await this.props.contextIdentifierProvider;
      return contextIdentifierProvider && contextIdentifierProvider.objectId;
    });

    _defineProperty(this, "uploadExternalMedia", async getPos => {
      const {
        node
      } = this.props;
      const mediaProvider = await this.props.mediaProvider;

      if (node && mediaProvider) {
        const uploadMediaClientConfig = mediaProvider.uploadMediaClientConfig;

        if (!uploadMediaClientConfig || !node.attrs.url) {
          return;
        }

        const mediaClient = getMediaClient(uploadMediaClientConfig);
        const collection = mediaProvider.uploadParams && mediaProvider.uploadParams.collection;

        try {
          const uploader = await mediaClient.file.uploadExternal(node.attrs.url, collection);
          const {
            uploadableFileUpfrontIds,
            dimensions
          } = uploader;
          replaceExternalMedia(getPos() + 1, {
            id: uploadableFileUpfrontIds.id,
            collection,
            height: dimensions.height,
            width: dimensions.width,
            occurrenceKey: uploadableFileUpfrontIds.occurrenceKey
          })(this.props.view.state, this.props.view.dispatch);
        } catch (e) {
          //keep it as external media
          if (this.props.dispatchAnalyticsEvent) {
            this.props.dispatchAnalyticsEvent({
              action: ACTION.UPLOAD_EXTERNAL_FAIL,
              actionSubject: ACTION_SUBJECT.EDITOR,
              eventType: EVENT_TYPE.OPERATIONAL
            });
          }
        }
      }
    });

    _defineProperty(this, "getNodeContextId", () => {
      const attrs = this.getAttrs();

      if (!attrs || attrs.type !== 'file') {
        return undefined;
      }

      return attrs.__contextId;
    });

    _defineProperty(this, "updateDimensions", dimensions => {
      updateAllMediaNodesAttrs(dimensions.id, {
        height: dimensions.height,
        width: dimensions.width
      }, true)(this.props.view.state, this.props.view.dispatch);
    });

    _defineProperty(this, "hasDifferentContextId", async () => {
      const nodeContextId = this.getNodeContextId();
      const currentContextId = await this.getObjectId();

      if (nodeContextId && currentContextId && nodeContextId !== currentContextId) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "isNodeFromDifferentCollection", async () => {
      const mediaProvider = await this.props.mediaProvider;

      if (!mediaProvider || !mediaProvider.uploadParams) {
        return false;
      }

      const currentCollectionName = mediaProvider.uploadParams.collection;
      const attrs = this.getAttrs();

      if (!attrs || attrs.type !== 'file') {
        return false;
      }

      const {
        collection: nodeCollection,
        __contextId
      } = attrs;
      const contextId = __contextId || (await this.getObjectId());

      if (contextId && currentCollectionName !== nodeCollection) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "copyNodeFromBlobUrl", async getPos => {
      const attrs = this.getAttrs();

      if (!attrs || attrs.type !== 'external') {
        return;
      }

      const {
        url
      } = attrs;
      const mediaAttrs = getAttrsFromUrl(url);

      if (!mediaAttrs) {
        return;
      }

      const mediaProvider = await this.props.mediaProvider;

      if (!mediaProvider || !mediaProvider.uploadParams) {
        return;
      }

      const currentCollectionName = mediaProvider.uploadParams.collection;
      const {
        contextId,
        id,
        collection,
        height,
        width,
        mimeType,
        name,
        size
      } = mediaAttrs;
      const uploadMediaClientConfig = mediaProvider.uploadMediaClientConfig;

      if (!uploadMediaClientConfig || !uploadMediaClientConfig.getAuthFromContext) {
        return;
      }

      const mediaClient = getMediaClient(uploadMediaClientConfig);
      const auth = await uploadMediaClientConfig.getAuthFromContext(contextId);
      const source = {
        id,
        collection,
        authProvider: () => Promise.resolve(auth)
      };
      const destination = {
        collection: currentCollectionName,
        authProvider: uploadMediaClientConfig.authProvider,
        occurrenceKey: uuidV4()
      };
      const mediaFile = await mediaClient.file.copyFile(source, destination);
      replaceExternalMedia(getPos() + 1, {
        id: mediaFile.id,
        collection: currentCollectionName,
        height,
        width,
        __fileName: name,
        __fileMimeType: mimeType,
        __fileSize: size
      })(this.props.view.state, this.props.view.dispatch);
    });

    _defineProperty(this, "copyNode", async () => {
      const mediaProvider = await this.props.mediaProvider;
      const {
        isMediaSingle,
        view
      } = this.props;
      const attrs = this.getAttrs();

      if (!mediaProvider || !mediaProvider.uploadParams || !attrs || attrs.type !== 'file') {
        return;
      }

      const nodeContextId = this.getNodeContextId();
      const uploadMediaClientConfig = mediaProvider.uploadMediaClientConfig;

      if (uploadMediaClientConfig && uploadMediaClientConfig.getAuthFromContext && nodeContextId) {
        const mediaClient = getMediaClient(uploadMediaClientConfig);
        const auth = await uploadMediaClientConfig.getAuthFromContext(nodeContextId);
        const objectId = await this.getObjectId();
        const {
          id,
          collection
        } = attrs;
        const source = {
          id,
          collection,
          authProvider: () => Promise.resolve(auth)
        };
        const currentCollectionName = mediaProvider.uploadParams.collection;
        const destination = {
          collection: currentCollectionName,
          authProvider: uploadMediaClientConfig.authProvider,
          occurrenceKey: uuidV4()
        };
        const mediaFile = await mediaClient.file.copyFile(source, destination);
        updateMediaNodeAttrs(source.id, {
          id: mediaFile.id,
          collection: currentCollectionName,
          __contextId: objectId
        }, isMediaSingle)(view.state, view.dispatch);
      }
    });

    this.props = props;
  }

  isMediaBlobUrl() {
    const attrs = this.getAttrs();
    return !!(attrs && attrs.type === 'external' && isMediaBlobUrl(attrs.url));
  } // Updates the node with contextId if it doesn't have one already
  // TODO [MS-2258]: remove updateContextId in order to only use updateFileAttrs


  async getRemoteDimensions() {
    const mediaProvider = await this.props.mediaProvider;
    const {
      mediaOptions
    } = this.props;
    const attrs = this.getAttrs();

    if (!mediaProvider || !attrs) {
      return false;
    }

    const {
      height,
      width
    } = attrs;

    if (attrs.type === 'external' || !attrs.id) {
      return false;
    }

    const {
      id,
      collection
    } = attrs;

    if (height && width) {
      return false;
    } // can't fetch remote dimensions on mobile, so we'll default them


    if (mediaOptions && !mediaOptions.allowRemoteDimensionsFetch) {
      return {
        id,
        height: DEFAULT_IMAGE_HEIGHT,
        width: DEFAULT_IMAGE_WIDTH
      };
    }

    const viewMediaClientConfig = mediaProvider.viewMediaClientConfig;
    const mediaClient = getMediaClient(viewMediaClientConfig);
    const state = await mediaClient.getImageMetadata(id, {
      collection
    });

    if (!state || !state.original) {
      return false;
    }

    return {
      id,
      height: state.original.height || DEFAULT_IMAGE_HEIGHT,
      width: state.original.width || DEFAULT_IMAGE_WIDTH
    };
  }

  async handleExternalMedia(getPos) {
    if (this.isMediaBlobUrl()) {
      try {
        await this.copyNodeFromBlobUrl(getPos);
      } catch (e) {
        await this.uploadExternalMedia(getPos);
      }
    } else {
      await this.uploadExternalMedia(getPos);
    }
  }

}

const hasPrivateAttrsChanged = (currentAttrs, newAttrs) => {
  return currentAttrs.__fileName !== newAttrs.__fileName || currentAttrs.__fileMimeType !== newAttrs.__fileMimeType || currentAttrs.__fileSize !== newAttrs.__fileSize || currentAttrs.__contextId !== newAttrs.__contextId;
};