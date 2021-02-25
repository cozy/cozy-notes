import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { WithProviders } from '@atlaskit/editor-common';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { Filmstrip } from '@atlaskit/media-filmstrip';
import React from 'react';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import WithPluginState from '../../../ui/WithPluginState';
import { setNodeSelection } from '../../../utils';
import { isNodeSelectedOrInRange, SelectedState } from '../../../utils/nodes';
import { pluginKey as editorDisabledPluginKey } from '../../editor-disabled';
import { stateKey as mediaStateKey } from '../pm-plugins/plugin-key';
import { MediaNodeUpdater } from './mediaNodeUpdater';

const isMediaGroupSelectedFromProps = props => {
  return isNodeSelectedOrInRange(props.anchorPos, props.headPos, props.getPos(), props.node.nodeSize);
};

const hasSelectionChanged = (oldProps, newProps) => {
  if (isMediaGroupSelectedFromProps(oldProps) !== isMediaGroupSelectedFromProps(newProps)) {
    return true;
  }

  if (isMediaGroupSelectedFromProps(newProps) === SelectedState.selectedInside) {
    return oldProps.anchorPos !== newProps.anchorPos;
  }

  return false;
};

export default class MediaGroup extends React.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "state", {
      viewMediaClientConfig: undefined
    });

    _defineProperty(this, "updateNodeAttrs", props => {
      const {
        view,
        mediaProvider,
        contextIdentifierProvider
      } = props;
      this.mediaNodes.forEach(node => {
        const mediaNodeUpdater = new MediaNodeUpdater({
          view,
          mediaProvider,
          contextIdentifierProvider,
          node,
          isMediaSingle: false
        });
        mediaNodeUpdater.updateFileAttrs(false);
      });
    });

    _defineProperty(this, "setMediaItems", props => {
      const {
        node
      } = props;
      this.mediaNodes = [];
      node.forEach((item, childOffset) => {
        this.mediaPluginState.mediaGroupNodes[item.attrs.id] = {
          node: item,
          getPos: () => props.getPos() + childOffset + 1
        };
        this.mediaNodes.push(item);
      });
    });

    _defineProperty(this, "getIdentifier", item => {
      if (item.attrs.type === 'external') {
        return {
          mediaItemType: 'external-image',
          dataURI: item.attrs.url
        };
      }

      return {
        id: item.attrs.id,
        mediaItemType: 'file',
        collectionName: item.attrs.collection
      };
    });

    _defineProperty(this, "isNodeSelected", nodePos => {
      const selected = isMediaGroupSelectedFromProps(this.props);

      if (selected === SelectedState.selectedInRange) {
        return true;
      }

      if (selected === SelectedState.selectedInside && this.props.anchorPos === nodePos) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "renderChildNodes", () => {
      const {
        viewMediaClientConfig
      } = this.state;
      const {
        getPos,
        allowLazyLoading,
        disabled,
        mediaOptions
      } = this.props;
      const items = this.mediaNodes.map((item, idx) => {
        // We declared this to get a fresh position every time
        const getNodePos = () => {
          return getPos() + idx + 1;
        };

        return {
          identifier: this.getIdentifier(item),
          isLazy: allowLazyLoading,
          selected: this.isNodeSelected(getNodePos()),
          onClick: () => {
            setNodeSelection(this.props.view, getNodePos());
          },
          actions: [{
            handler: disabled ? () => {} : this.mediaPluginState.handleMediaNodeRemoval.bind(null, undefined, getNodePos),
            icon: /*#__PURE__*/React.createElement(EditorCloseIcon, {
              label: "delete"
            })
          }]
        };
      });
      return /*#__PURE__*/React.createElement(Filmstrip, {
        items: items,
        mediaClientConfig: viewMediaClientConfig,
        featureFlags: mediaOptions.featureFlags
      });
    });

    this.mediaNodes = [];
    this.mediaPluginState = mediaStateKey.getState(_props.view.state);
    this.setMediaItems(_props);
    this.state = {
      viewMediaClientConfig: undefined
    };
  }

  componentDidMount() {
    this.updateMediaClientConfig();
    this.mediaNodes.forEach(async node => {
      if (node.attrs.type === 'external') {
        return;
      }

      const {
        view,
        mediaProvider,
        contextIdentifierProvider
      } = this.props;
      const mediaNodeUpdater = new MediaNodeUpdater({
        view,
        mediaProvider,
        contextIdentifierProvider,
        node,
        isMediaSingle: false
      });
      const contextId = mediaNodeUpdater.getNodeContextId();

      if (!contextId) {
        await mediaNodeUpdater.updateContextId();
      }

      const hasDifferentContextId = await mediaNodeUpdater.hasDifferentContextId();

      if (hasDifferentContextId) {
        await mediaNodeUpdater.copyNode();
      }
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.updateMediaClientConfig();
    this.setMediaItems(props);

    if (props.isCopyPasteEnabled !== false) {
      this.updateNodeAttrs(props);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (hasSelectionChanged(this.props, nextProps) || this.props.node !== nextProps.node || this.state.viewMediaClientConfig !== this.mediaPluginState.mediaClientConfig) {
      return true;
    }

    return false;
  }

  updateMediaClientConfig() {
    const {
      viewMediaClientConfig
    } = this.state;
    const {
      mediaClientConfig
    } = this.mediaPluginState;

    if (!viewMediaClientConfig && mediaClientConfig) {
      this.setState({
        viewMediaClientConfig: mediaClientConfig
      });
    }
  }

  render() {
    return this.renderChildNodes();
  }

}

_defineProperty(MediaGroup, "displayName", 'MediaGroup');

class MediaGroupNodeView extends ReactNodeView {
  render(props, forwardRef) {
    const {
      providerFactory,
      mediaOptions
    } = props;
    const getPos = this.getPos;
    return /*#__PURE__*/React.createElement(WithProviders, {
      providers: ['mediaProvider', 'contextIdentifierProvider'],
      providerFactory: providerFactory,
      renderNode: ({
        mediaProvider,
        contextIdentifierProvider
      }) => {
        const renderFn = ({
          editorDisabledPlugin
        }) => {
          if (!mediaProvider) {
            return null;
          }

          return /*#__PURE__*/React.createElement(MediaGroup, {
            node: this.node,
            getPos: getPos,
            view: this.view,
            forwardRef: forwardRef,
            disabled: (editorDisabledPlugin || {}).editorDisabled,
            allowLazyLoading: mediaOptions.allowLazyLoading,
            mediaProvider: mediaProvider,
            contextIdentifierProvider: contextIdentifierProvider,
            isCopyPasteEnabled: mediaOptions.isCopyPasteEnabled,
            anchorPos: this.view.state.selection.$anchor.pos,
            headPos: this.view.state.selection.$head.pos,
            mediaOptions: mediaOptions
          });
        };

        return /*#__PURE__*/React.createElement(WithPluginState, {
          editorView: this.view,
          plugins: {
            reactNodeViewState: reactNodeViewStateKey,
            editorDisabledPlugin: editorDisabledPluginKey
          },
          render: renderFn
        });
      }
    });
  }

}

export const ReactMediaGroupNode = (portalProviderAPI, eventDispatcher, providerFactory, mediaOptions = {}) => (node, view, getPos) => {
  return new MediaGroupNodeView(node, view, getPos, portalProviderAPI, eventDispatcher, {
    providerFactory,
    mediaOptions
  }).init();
};