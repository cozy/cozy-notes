import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import styled from 'styled-components' // AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points

import { fontSizeSmall } from '@atlaskit/theme'
import { N20, N800, N100 } from '@atlaskit/theme/colors'
import distanceInWords from 'date-fns/distance_in_words'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import format from 'date-fns/format'
import { injectIntl } from 'react-intl'
import messages from '../../messages'
export const Container = styled.li`
  background-color: ${props => (props.selected ? N20 : 'transparent')};
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  margin-top: 0;
`
const NameWrapper = styled.span`
  overflow: hidden;
`
export const Name = styled.div`
  color: ${N800};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`
export const ContainerName = styled.div`
  color: ${N100};
  line-height: 14px;
  font-size: ${fontSizeSmall()}px;
`
const Icon = styled.span`
  min-width: 16px;
  margin-top: 3px;
  margin-right: 12px;

  img {
    max-width: 16px;
  }
`

class LinkSearchListItem extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleSelect', e => {
      e.preventDefault() // don't let editor lose focus

      const { item, onSelect } = this.props
      onSelect(item.url, item.name)
    })

    _defineProperty(this, 'handleMouseMove', () => {
      const { onMouseMove, item } = this.props
      onMouseMove(item.objectId)
    })
  }

  renderIcon() {
    const {
      item: { icon, iconUrl }
    } = this.props

    if (icon) {
      return /*#__PURE__*/ React.createElement(Icon, null, icon)
    }

    if (iconUrl) {
      return /*#__PURE__*/ React.createElement(
        Icon,
        null,
        /*#__PURE__*/ React.createElement('img', {
          src: iconUrl
        })
      )
    }

    return null
  }

  renderWithSpaces(pageAction, dateString, timeSince = '') {
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      '\xA0 \u2022',
      /*#__PURE__*/ React.createElement(
        'span',
        {
          className: 'link-search-timestamp',
          'data-test-id': 'link-search-timestamp'
        },
        '\xA0 ',
        pageAction,
        ' ',
        dateString,
        ' ',
        timeSince
      )
    )
  }

  renderAbsoluteOrRelativeDate(timeStamp, pageAction) {
    const { intl } = this.props
    let pageActionText = ''

    switch (pageAction) {
      case 'updated':
        pageActionText = intl.formatMessage(messages.timeUpdated)
        break

      case 'viewed':
        pageActionText = intl.formatMessage(messages.timeViewed)
        break
    }

    if (differenceInCalendarDays(timeStamp, Date.now()) < -7) {
      return this.renderWithSpaces(
        pageActionText,
        format(timeStamp, 'MMMM DD, YYYY')
      )
    }

    return this.renderWithSpaces(
      pageActionText,
      distanceInWords(timeStamp, Date.now()),
      intl.formatMessage(messages.timeAgo)
    )
  }

  renderTimeStamp() {
    const { lastUpdatedDate, lastViewedDate } = this.props.item

    if (lastViewedDate) {
      return this.renderAbsoluteOrRelativeDate(lastViewedDate, 'viewed')
    }

    if (lastUpdatedDate) {
      return this.renderAbsoluteOrRelativeDate(lastUpdatedDate, 'updated')
    }
  }

  render() {
    const { item, selected } = this.props
    return /*#__PURE__*/ React.createElement(
      Container,
      {
        'data-testid': 'link-search-list-item',
        selected: selected,
        onMouseMove: this.handleMouseMove,
        onClick: this.handleSelect
      },
      this.renderIcon(),
      /*#__PURE__*/ React.createElement(
        NameWrapper,
        null,
        /*#__PURE__*/ React.createElement(Name, null, item.name),
        /*#__PURE__*/ React.createElement(
          ContainerName,
          null,
          item.container,
          this.renderTimeStamp()
        )
      )
    )
  }
}

export default injectIntl(LinkSearchListItem)
