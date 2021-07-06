import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { injectIntl } from 'react-intl'
import {
  timestampToString,
  timestampToTaskContext,
  isPastDate,
  DateSharedCssClassName
} from '@atlaskit/editor-common'
import { Date } from '@atlaskit/date'
import { setDatePickerAt } from '../actions'

class DateNodeView extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleClick', event => {
      event.nativeEvent.stopImmediatePropagation()
      const { state, dispatch } = this.props.view
      setDatePickerAt(state.selection.from)(state, dispatch)
    })
  }

  render() {
    const {
      node: {
        attrs: { timestamp }
      },
      view: {
        state: { schema, selection }
      },
      intl
    } = this.props
    const parent = selection.$from.parent
    const withinIncompleteTask =
      parent.type === schema.nodes.taskItem && parent.attrs.state !== 'DONE'
    const color =
      withinIncompleteTask && isPastDate(timestamp) ? 'red' : undefined
    return /*#__PURE__*/ React.createElement(
      'span',
      {
        className: DateSharedCssClassName.DATE_WRAPPER,
        onClick: this.handleClick
      },
      /*#__PURE__*/ React.createElement(
        Date,
        {
          color: color,
          value: timestamp
        },
        withinIncompleteTask
          ? timestampToTaskContext(timestamp, intl)
          : timestampToString(timestamp, intl)
      )
    )
  }
}

export default injectIntl(DateNodeView)
