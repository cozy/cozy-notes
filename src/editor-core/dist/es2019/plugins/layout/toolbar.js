import { findDomRefAtPos } from 'prosemirror-utils'
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal'
import LayoutThreeEqualIcon from '@atlaskit/icon/glyph/editor/layout-three-equal'
import LayoutTwoLeftSidebarIcon from '@atlaskit/icon/glyph/editor/layout-two-left-sidebar'
import LayoutTwoRightSidebarIcon from '@atlaskit/icon/glyph/editor/layout-two-right-sidebar'
import LayoutThreeWithSidebarsIcon from '@atlaskit/icon/glyph/editor/layout-three-with-sidebars'
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import { toolbarMessages } from './toolbar-messages'
import commonMessages from '../../messages'
import {
  setPresetLayout,
  deleteActiveLayoutNode,
  getPresetLayout
} from './actions'
import { hoverDecoration } from '../base/pm-plugins/decoration'
const LAYOUT_TYPES = [
  {
    type: 'two_equal',
    title: toolbarMessages.twoColumns,
    icon: LayoutTwoEqualIcon
  },
  {
    type: 'three_equal',
    title: toolbarMessages.threeColumns,
    icon: LayoutThreeEqualIcon
  }
]
const SIDEBAR_LAYOUT_TYPES = [
  {
    type: 'two_right_sidebar',
    title: toolbarMessages.rightSidebar,
    icon: LayoutTwoRightSidebarIcon
  },
  {
    type: 'two_left_sidebar',
    title: toolbarMessages.leftSidebar,
    icon: LayoutTwoLeftSidebarIcon
  },
  {
    type: 'three_with_sidebars',
    title: toolbarMessages.threeColumnsWithSidebars,
    icon: LayoutThreeWithSidebarsIcon
  }
]

const buildLayoutButton = (intl, item, currentLayout) => ({
  type: 'button',
  icon: item.icon,
  testId: item.title.id,
  title: intl.formatMessage(item.title),
  onClick: setPresetLayout(item.type),
  selected: !!currentLayout && currentLayout === item.type
})

export const layoutToolbarTitle = 'Layout floating controls'
export const buildToolbar = (
  state,
  intl,
  pos,
  _allowBreakout,
  addSidebarLayouts
) => {
  const node = state.doc.nodeAt(pos)

  if (node) {
    const currentLayout = getPresetLayout(node)
    const separator = {
      type: 'separator'
    }
    const nodeType = state.schema.nodes.layoutSection
    const deleteButton = {
      type: 'button',
      appearance: 'danger',
      icon: RemoveIcon,
      testId: commonMessages.remove.id,
      title: intl.formatMessage(commonMessages.remove),
      onClick: deleteActiveLayoutNode,
      onMouseEnter: hoverDecoration(nodeType, true),
      onMouseLeave: hoverDecoration(nodeType, false)
    }
    return {
      title: layoutToolbarTitle,
      getDomRef: view => findDomRefAtPos(pos, view.domAtPos.bind(view)),
      nodeType,
      items: [
        ...LAYOUT_TYPES.map(i => buildLayoutButton(intl, i, currentLayout)),
        ...(addSidebarLayouts
          ? SIDEBAR_LAYOUT_TYPES.map(i =>
              buildLayoutButton(intl, i, currentLayout)
            )
          : []),
        separator,
        deleteButton
      ]
    }
  }

  return
}
