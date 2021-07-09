import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import LayoutThreeEqualIcon from '@atlaskit/icon/glyph/editor/layout-three-equal';
import LayoutTwoLeftSidebarIcon from '@atlaskit/icon/glyph/editor/layout-two-left-sidebar';
import LayoutTwoRightSidebarIcon from '@atlaskit/icon/glyph/editor/layout-two-right-sidebar';
import LayoutThreeWithSidebarsIcon from '@atlaskit/icon/glyph/editor/layout-three-with-sidebars';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import { toolbarMessages } from './toolbar-messages';
import commonMessages from '../../messages';
import { MessageDescriptor } from '../../types/i18n';
import { Command } from '../../types';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
  FloatingToolbarSeparator,
  FloatingToolbarButton,
  Icon,
} from '../floating-toolbar/types';
import {
  setPresetLayout,
  deleteActiveLayoutNode,
  getPresetLayout,
} from './actions';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import { PresetLayout } from './types';

type PresetLayoutButtonItem = {
  id?: string;
  type: PresetLayout;
  title: MessageDescriptor;
  icon: Icon;
};

const LAYOUT_TYPES: PresetLayoutButtonItem[] = [
  {
    id: 'editor.layout.twoEquals',
    type: 'two_equal',
    title: toolbarMessages.twoColumns,
    icon: LayoutTwoEqualIcon,
  },
  {
    id: 'editor.layout.threeEquals',
    type: 'three_equal',
    title: toolbarMessages.threeColumns,
    icon: LayoutThreeEqualIcon,
  },
];

const SIDEBAR_LAYOUT_TYPES: PresetLayoutButtonItem[] = [
  {
    id: 'editor.layout.twoRightSidebar',
    type: 'two_right_sidebar',
    title: toolbarMessages.rightSidebar,
    icon: LayoutTwoRightSidebarIcon,
  },
  {
    id: 'editor.layout.twoLeftSidebar',
    type: 'two_left_sidebar',
    title: toolbarMessages.leftSidebar,
    icon: LayoutTwoLeftSidebarIcon,
  },
  {
    id: 'editor.layout.threeWithSidebars',
    type: 'three_with_sidebars',
    title: toolbarMessages.threeColumnsWithSidebars,
    icon: LayoutThreeWithSidebarsIcon,
  },
];

const buildLayoutButton = (
  intl: InjectedIntl,
  item: PresetLayoutButtonItem,
  currentLayout: string | undefined,
): FloatingToolbarItem<Command> => ({
  id: item.id,
  type: 'button',
  icon: item.icon,
  testId: item.title.id,
  title: intl.formatMessage(item.title),
  onClick: setPresetLayout(item.type),
  selected: !!currentLayout && currentLayout === item.type,
});

export const layoutToolbarTitle = 'Layout floating controls';

export const buildToolbar = (
  state: EditorState,
  intl: InjectedIntl,
  pos: number,
  _allowBreakout: boolean,
  addSidebarLayouts: boolean,
): FloatingToolbarConfig | undefined => {
  const node = state.doc.nodeAt(pos);
  if (node) {
    const currentLayout = getPresetLayout(node);

    const separator: FloatingToolbarSeparator = {
      type: 'separator',
    };

    const nodeType = state.schema.nodes.layoutSection;

    const deleteButton: FloatingToolbarButton<Command> = {
      id: 'editor.layout.delete',
      type: 'button',
      appearance: 'danger',
      icon: RemoveIcon,
      testId: commonMessages.remove.id,
      title: intl.formatMessage(commonMessages.remove),
      onClick: deleteActiveLayoutNode,
      onMouseEnter: hoverDecoration(nodeType, true),
      onMouseLeave: hoverDecoration(nodeType, false),
    };

    return {
      title: layoutToolbarTitle,
      getDomRef: (view) =>
        findDomRefAtPos(pos, view.domAtPos.bind(view)) as HTMLElement,
      nodeType,
      items: [
        ...LAYOUT_TYPES.map((i) => buildLayoutButton(intl, i, currentLayout)),
        ...(addSidebarLayouts
          ? SIDEBAR_LAYOUT_TYPES.map((i) =>
              buildLayoutButton(intl, i, currentLayout),
            )
          : []),
        separator,
        deleteButton,
      ],
    };
  }
  return;
};
