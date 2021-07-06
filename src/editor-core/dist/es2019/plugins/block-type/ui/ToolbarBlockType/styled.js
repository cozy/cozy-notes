import { N400 } from '@atlaskit/theme/colors'
import styled from 'styled-components'
import { headingsSharedStyles } from '@atlaskit/editor-common'
import { Shortcut } from '../../../../ui/styles'
export const BlockTypeMenuItem = styled.div`
  ${headingsSharedStyles};
  > {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
    }
  }
  ${props => (props.selected ? `${props.tagName} { color: white }` : '')};
`
export const KeyboardShortcut = styled(Shortcut)`
  ${props => (props.selected ? `color: ${N400};` : '')}
  margin-left: 16px;
`
