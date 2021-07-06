import { isFullPage } from '../../utils/is-full-page'
import { ToolbarSize } from './types' // Toolbar sizes for full page editor a little bit different, because it has more buttons e.g. actions button...

const toolbarSizesFullPage = [
  {
    width: 650,
    size: ToolbarSize.XXL
  },
  {
    width: 580,
    size: ToolbarSize.XL
  },
  {
    width: 540,
    size: ToolbarSize.L
  },
  {
    width: 490,
    size: ToolbarSize.M
  },
  {
    width: 410,
    size: ToolbarSize.S
  }
]
const toolbarSizes = [
  {
    width: 610,
    size: ToolbarSize.XXL
  },
  {
    width: 540,
    size: ToolbarSize.XL
  },
  {
    width: 460,
    size: ToolbarSize.L
  },
  {
    width: 450,
    size: ToolbarSize.M
  },
  {
    width: 370,
    size: ToolbarSize.S
  }
]

const toolbarSizesForAppearance = appearance =>
  isFullPage(appearance) ? toolbarSizesFullPage : toolbarSizes

export const widthToToolbarSize = (toolbarWidth, appearance) => {
  return (
    toolbarSizesForAppearance(appearance).find(
      ({ width }) => toolbarWidth > width
    ) || {
      size: ToolbarSize.XXXS
    }
  ).size
}
