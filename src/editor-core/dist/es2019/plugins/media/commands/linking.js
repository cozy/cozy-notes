import { createMediaLinkingCommand, getMediaLinkingState, mediaLinkingPluginKey } from '../pm-plugins/linking';
import { normalizeUrl } from '../../hyperlink/utils';
import { createToggleBlockMarkOnRange } from '../../../commands';
import { MediaLinkingActionsTypes } from '../pm-plugins/linking/actions';
import { addAnalytics, EVENT_TYPE, ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from '../../analytics';
import { currentMediaNode } from '../utils/current-media-node';
import { checkMediaType } from '../utils/check-media-type';
import { getMediaPluginState } from '../pm-plugins/main';
export const showLinkingToolbar = createMediaLinkingCommand(state => {
  const mediaLinkingState = getMediaLinkingState(state);

  if (mediaLinkingState && mediaLinkingState.mediaPos !== null) {
    const mediaSingle = state.doc.nodeAt(mediaLinkingState.mediaPos);

    if (mediaSingle) {
      return {
        type: MediaLinkingActionsTypes.showToolbar
      };
    }
  }

  return false;
});
export const showLinkingToolbarWithMediaTypeCheck = (editorState, dispatch, editorView) => {
  if (dispatch && editorView) {
    const mediaNode = currentMediaNode(editorState);

    if (!mediaNode) {
      return false;
    }

    const {
      mediaClientConfig
    } = getMediaPluginState(editorState);

    if (!mediaClientConfig) {
      return false;
    }

    checkMediaType(mediaNode, mediaClientConfig).then(mediaType => {
      if ((mediaType === 'external' || mediaType === 'image') && // We make sure the selection and the node hasn't changed.
      currentMediaNode(editorView.state) === mediaNode) {
        dispatch(editorView.state.tr.setMeta(mediaLinkingPluginKey, {
          type: MediaLinkingActionsTypes.showToolbar
        }));
      }
    });
  }

  return true;
};
const hideLinkingToolbarCommand = createMediaLinkingCommand({
  type: MediaLinkingActionsTypes.hideToolbar
});
export const hideLinkingToolbar = (state, dispatch, view) => {
  hideLinkingToolbarCommand(state, dispatch, view); // restore focus on the editor so keyboard shortcuts aren't lost to the browser

  if (view) {
    view.focus();
  }
};

function getCurrentUrl(state) {
  const {
    link: linkType
  } = state.schema.marks;
  const mediaLinkingState = getMediaLinkingState(state);

  if (!mediaLinkingState || mediaLinkingState.mediaPos === null) {
    return;
  }

  const $pos = state.doc.resolve(mediaLinkingState.mediaPos);
  const node = state.doc.nodeAt($pos.pos);

  if (!node) {
    return;
  }

  const hasLink = linkType.isInSet(node.marks);

  if (!hasLink) {
    return;
  }

  const link = node.marks.find(mark => mark.type === linkType); // Already check exist

  const url = link.attrs.href;
  return url;
}

function toggleLinkMark(tr, state, {
  forceRemove = false,
  url
}) {
  const mediaLinkingState = getMediaLinkingState(state);

  if (!mediaLinkingState || mediaLinkingState.mediaPos === null) {
    return tr;
  }

  const $pos = state.doc.resolve(mediaLinkingState.mediaPos);
  const node = state.doc.nodeAt($pos.pos);

  if (!node) {
    return tr;
  }

  const linkMark = state.schema.marks.link;
  const {
    media
  } = state.schema.nodes;
  const toggleBlockLinkMark = createToggleBlockMarkOnRange(linkMark, (prevAttrs, node) => {
    // Only add mark to media
    if (!node || node.type !== media) {
      return; //No op
    }

    if (forceRemove) {
      return false;
    }

    const href = normalizeUrl(url);

    if (prevAttrs && prevAttrs.href === href) {
      return; //No op
    }

    if (href.trim() === '') {
      return false; // remove
    }

    return { ...prevAttrs,
      href: href
    };
  }, [media]);
  toggleBlockLinkMark($pos.pos, $pos.pos + node.nodeSize, tr, state);
  return tr;
}

const fireAnalyticForMediaLink = (tr, state, action, attributes = undefined) => {
  return addAnalytics(state, tr, {
    action,
    eventType: EVENT_TYPE.TRACK,
    actionSubject: ACTION_SUBJECT.MEDIA,
    actionSubjectId: ACTION_SUBJECT_ID.LINK,
    attributes
  });
};

export const unlink = createMediaLinkingCommand({
  type: MediaLinkingActionsTypes.unlink
}, (tr, state) => {
  const transaction = toggleLinkMark(tr, state, {
    forceRemove: true
  });
  return fireAnalyticForMediaLink(transaction, state, ACTION.DELETED);
});

const getAction = (newUrl, state) => {
  const currentUrl = getCurrentUrl(state);

  if (!currentUrl) {
    return ACTION.ADDED;
  } else if (newUrl !== currentUrl) {
    return ACTION.EDITED;
  }

  return undefined;
};

export const setUrlToMedia = (url, inputMethod) => createMediaLinkingCommand({
  type: MediaLinkingActionsTypes.setUrl,
  payload: normalizeUrl(url)
}, (tr, state) => {
  const action = getAction(url, state);

  if (!action) {
    return tr;
  }

  try {
    const toggleLinkMarkResult = toggleLinkMark(tr, state, {
      url: url
    });
    fireAnalyticForMediaLink(tr, state, action, action === ACTION.ADDED ? {
      inputMethod
    } : undefined);
    return toggleLinkMarkResult;
  } catch (e) {
    fireAnalyticForMediaLink(tr, state, ACTION.ERRORED, {
      action: action
    });
    throw e;
  }
});