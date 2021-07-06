import styled from 'styled-components'; // prettier-ignore

import { N30, N300 } from '@atlaskit/theme/colors'
export const RowStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 6px 14px;
  text-overflow: ellipsis;
  vertical-align: middle;
`
export const AvatarStyle = styled.span`
  position: relative;
  flex: initial;
  opacity: inherit;
  width: 36px;
  height: 36px;

  > span {
    width: 18px;
    height: 18px;
    padding: 9px;
  }
`
export const NameSectionStyle = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 14px;
  color: ${N300};
  opacity: ${props => (props.restricted ? '0.5' : 'inherit')};
`
export const MentionItemStyle = styled.div`
  background-color: ${props => (props.selected ? N30 : 'transparent')};
  display: block;
  overflow: hidden;
  list-style-type: none;
  cursor: pointer;
`
export const CapitalizedStyle = styled.span`
  text-transform: capitalize;
`
