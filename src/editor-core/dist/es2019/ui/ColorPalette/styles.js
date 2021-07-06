import styled from 'styled-components'
import { gridSize } from '@atlaskit/theme/constants'
export const ColorPaletteWrapper = styled.div`
  padding: 0 ${gridSize()}px;
  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */
  display: flex;
`
