import styled from 'styled-components'
import { fontSize, gridSize } from '@atlaskit/theme/constants'
import { themed } from '@atlaskit/theme/components'
import { borderRadius } from '@atlaskit/theme/constants'
import { N20, DN50, DN700, B200, N20A, N70 } from '@atlaskit/theme/colors'
export const padding = gridSize()
export const BODIED_EXT_PADDING = padding * 2
export const Wrapper = styled.div`
  background: ${themed({
    light: N20,
    dark: DN50
  })};
  border-radius: ${borderRadius()}px;
  position: relative;
  vertical-align: middle;
  font-size: ${fontSize()}px;

  .ProseMirror-selectednode > span > & > .extension-overlay {
    box-shadow: inset 0px 0px 0px 2px ${B200};
    opacity: 1;
  }

  &.with-overlay {
    .extension-overlay {
      background: ${N20A};
      color: transparent;
    }

    &:hover .extension-overlay {
      opacity: 1;
    }
  }
`
export const Overlay = styled.div`
  border-radius: ${borderRadius()}px;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
`
export const PlaceholderFallback = styled.div`
  display: inline-flex;
  align-items: center;

  & > img {
    margin: 0 4px;
  }
`
export const PlaceholderFallbackParams = styled.span`
  display: inline-block;
  max-width: 200px;
  margin-left: 5px;
  color: ${N70};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
export const StyledImage = styled.img`
  max-height: 16px;
  max-width: 16px;
`
