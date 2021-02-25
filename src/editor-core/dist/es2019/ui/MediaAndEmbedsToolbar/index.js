import { NodeSelection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import commonMessages from '../../messages';
import WrapLeftIcon from '@atlaskit/icon/glyph/editor/media-wrap-left';
import WrapRightIcon from '@atlaskit/icon/glyph/editor/media-wrap-right';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import EditorAlignImageLeft from '@atlaskit/icon/glyph/editor/align-image-left';
import EditorAlignImageRight from '@atlaskit/icon/glyph/editor/align-image-right';
import EditorAlignImageCenter from '@atlaskit/icon/glyph/editor/align-image-center';
import { alignAttributes } from '../../utils/rich-media-utils';
import { pluginKey as widthPluginKey } from '../../plugins/width';
import { DEFAULT_EMBED_CARD_WIDTH } from '@atlaskit/editor-shared-styles';
import { addAnalytics } from '../../plugins/analytics/utils';
import { ACTION_SUBJECT, ACTION_SUBJECT_ID, EVENT_TYPE, ACTION } from '../../plugins/analytics';
import { toolbarMessages } from './toolbar-messages';
const alignmentIcons = [{
  value: 'align-start',
  icon: EditorAlignImageLeft
}, {
  value: 'center',
  icon: EditorAlignImageCenter
}, {
  value: 'align-end',
  icon: EditorAlignImageRight
}];
const wrappingIcons = [{
  value: 'wrap-left',
  icon: WrapLeftIcon
}, {
  value: 'wrap-right',
  icon: WrapRightIcon
}];
const breakoutIcons = [{
  value: 'wide',
  icon: WideIcon
}, {
  value: 'full-width',
  icon: FullWidthIcon
}];
const layoutToMessages = {
  'wrap-left': toolbarMessages.wrapLeft,
  center: commonMessages.alignImageCenter,
  'wrap-right': toolbarMessages.wrapRight,
  wide: commonMessages.layoutWide,
  'full-width': commonMessages.layoutFullWidth,
  'align-end': commonMessages.alignImageRight,
  'align-start': commonMessages.alignImageLeft
};

const getNodeWidth = (node, schema) => {
  const {
    embedCard
  } = schema.nodes;

  if (node.type === embedCard) {
    return node.attrs.originalWidth || DEFAULT_EMBED_CARD_WIDTH;
  }

  return node.firstChild && node.firstChild.attrs.width || node.attrs.width;
};

const makeAlign = (layout, nodeType) => {
  return (state, dispatch) => {
    const {
      node
    } = state.selection;
    const {
      layout: previousLayoutType
    } = node.attrs;
    const {
      mediaSingle
    } = state.schema.nodes;

    if (!dispatch) {
      return false;
    }

    const widthPluginState = widthPluginKey.getState(state);

    if (!node || node.type !== nodeType || !widthPluginState) {
      return false;
    }

    const nodeWidth = getNodeWidth(node, state.schema);
    const newAttrs = alignAttributes(layout, node.attrs, undefined, nodeWidth, widthPluginState.lineLength);
    const tr = state.tr.setNodeMarkup(state.selection.from, undefined, newAttrs);
    tr.setMeta('scrollIntoView', false);
    dispatch(addAnalytics(state, tr, {
      eventType: EVENT_TYPE.TRACK,
      action: ACTION.SELECTED,
      actionSubject: ACTION_SUBJECT[node.type === mediaSingle ? 'MEDIA_SINGLE' : 'EMBEDS'],
      actionSubjectId: ACTION_SUBJECT_ID.RICH_MEDIA_LAYOUT,
      attributes: {
        previousLayoutType,
        currentLayoutType: layout
      }
    }));
    return true;
  };
};

const mapIconsToToolbarItem = (icons, layout, intl, nodeType) => icons.map(toolbarItem => {
  const {
    value
  } = toolbarItem;
  return {
    type: 'button',
    icon: toolbarItem.icon,
    title: intl.formatMessage(layoutToMessages[value]),
    selected: layout === value,
    onClick: makeAlign(value, nodeType)
  };
});

const shouldHideLayoutToolbar = (selection, {
  nodes
}, allowResizingInTables) => {
  return hasParentNodeOfType([nodes.bodiedExtension, nodes.listItem, nodes.expand, nodes.nestedExpand, ...(allowResizingInTables ? [] : [nodes.table])].filter(Boolean))(selection);
};

const buildLayoutButtons = (state, intl, nodeType, allowResizing, allowResizingInTables) => {
  const {
    selection
  } = state;

  if (!(selection instanceof NodeSelection) || !selection.node || !nodeType || shouldHideLayoutToolbar(selection, state.schema, allowResizingInTables)) {
    return [];
  }

  const {
    layout
  } = selection.node.attrs;
  let toolbarItems = [...mapIconsToToolbarItem(alignmentIcons, layout, intl, nodeType), {
    type: 'separator'
  }, ...mapIconsToToolbarItem(wrappingIcons, layout, intl, nodeType)];

  if (!allowResizing) {
    toolbarItems = toolbarItems.concat([{
      type: 'separator'
    }, ...mapIconsToToolbarItem(breakoutIcons, layout, intl, nodeType)]);
  }

  return toolbarItems;
};

export default buildLayoutButtons;