import React from 'react'
import { PureComponent } from 'react'
import Spinner from '@atlaskit/spinner'
import styled from 'styled-components'
import LinkSearchListItem from './LinkSearchListItem'
const ListContainer = styled.div`
  padding-top: 0;
`
const SpinnerContainer = styled.div`
  text-align: center;
  min-height: 80px;
  margin-top: 30px;
`
export const List = styled.ul`
  padding: 0;
  list-style: none;
`
export default class LinkSearchList extends PureComponent {
  render() {
    const {
      onSelect,
      onMouseMove,
      items,
      selectedIndex,
      isLoading
    } = this.props
    let itemsContent
    let loadingContent

    if (items && items.length > 0) {
      itemsContent = /*#__PURE__*/ React.createElement(
        List,
        null,
        items.map((item, index) =>
          /*#__PURE__*/ React.createElement(LinkSearchListItem, {
            item: item,
            selected: selectedIndex === index,
            onMouseMove: onMouseMove,
            onSelect: onSelect,
            key: item.objectId
          })
        )
      )
    }

    if (isLoading) {
      loadingContent = /*#__PURE__*/ React.createElement(
        SpinnerContainer,
        null,
        /*#__PURE__*/ React.createElement(Spinner, {
          size: 'medium'
        })
      )
    }

    return /*#__PURE__*/ React.createElement(
      ListContainer,
      null,
      itemsContent,
      loadingContent
    )
  }
}
