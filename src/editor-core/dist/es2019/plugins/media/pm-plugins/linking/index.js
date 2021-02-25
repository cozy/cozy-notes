import { pluginFactory } from '../../../../utils/plugin-state-factory';
import { PluginKey, Plugin, NodeSelection } from 'prosemirror-state';
import reducer from './reducer';
export const mediaLinkingPluginKey = new PluginKey('mediaLinking');
const initialState = {
  visible: false,
  editable: false,
  mediaPos: null,
  link: ''
};

function mapping(tr, pluginState) {
  if (pluginState && pluginState.mediaPos !== null) {
    return { ...pluginState,
      mediaPos: tr.mapping.map(pluginState.mediaPos)
    };
  }

  return pluginState;
}

function onSelectionChanged(tr) {
  const isNodeSelection = tr.selection instanceof NodeSelection;

  if (!isNodeSelection) {
    return initialState;
  }

  const mediaPos = tr.selection.$from.pos + 1;
  const node = tr.doc.nodeAt(mediaPos);

  if (!node || node.type.name !== 'media') {
    return initialState;
  }

  const mark = node.marks.find(mark => mark.type.name === 'link');

  if (mark) {
    return { ...initialState,
      mediaPos,
      editable: true,
      link: mark.attrs.href
    };
  }

  return { ...initialState,
    mediaPos
  };
}

const mediaLinkingPluginFactory = pluginFactory(mediaLinkingPluginKey, reducer, {
  mapping,
  onSelectionChanged
});
export const {
  createCommand: createMediaLinkingCommand,
  getPluginState: getMediaLinkingState
} = mediaLinkingPluginFactory;
export default (dispatch => new Plugin({
  key: mediaLinkingPluginKey,
  state: mediaLinkingPluginFactory.createPluginState(dispatch, initialState)
}));