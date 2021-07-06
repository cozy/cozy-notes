import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import Find from './Find'
import Replace from './Replace'
import { Rule, Wrapper } from './styles'

class FindReplace extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {})

    _defineProperty(this, 'setFindTextfieldRef', findTextfieldRef => {
      this.setState({
        findTextfieldRef
      })
    })

    _defineProperty(this, 'setReplaceTextfieldRef', replaceTextfieldRef => {
      this.setState({
        replaceTextfieldRef
      })
    })

    _defineProperty(this, 'setFocusToFind', () => {
      const { findTextfieldRef } = this.state

      if (findTextfieldRef && findTextfieldRef.current) {
        findTextfieldRef.current.focus()
      }
    })

    _defineProperty(this, 'setFocusToReplace', () => {
      const { replaceTextfieldRef } = this.state

      if (replaceTextfieldRef && replaceTextfieldRef.current) {
        replaceTextfieldRef.current.focus()
      }
    })
  }

  render() {
    const {
      findText,
      count,
      shouldFocus,
      onFind,
      onFindBlur,
      onFindNext,
      onFindPrev,
      onFocusElementRefSet,
      onCancel,
      replaceText,
      onReplace,
      onReplaceAll,
      dispatchAnalyticsEvent,
      allowMatchCase,
      shouldMatchCase,
      onToggleMatchCase
    } = this.props
    return /*#__PURE__*/ React.createElement(
      Wrapper,
      null,
      /*#__PURE__*/ React.createElement(Find, {
        allowMatchCase: allowMatchCase,
        shouldMatchCase: shouldMatchCase,
        onToggleMatchCase: onToggleMatchCase,
        findText: findText,
        count: count,
        shouldFocus: shouldFocus,
        onFind: onFind,
        onFindBlur: onFindBlur,
        onFindPrev: onFindPrev,
        onFindNext: onFindNext,
        onFindTextfieldRefSet: this.setFindTextfieldRef,
        onFocusElementRefSet: onFocusElementRefSet,
        onCancel: onCancel,
        onArrowDown: this.setFocusToReplace
      }),
      /*#__PURE__*/ React.createElement(Rule, null),
      /*#__PURE__*/ React.createElement(Replace, {
        canReplace: count.total > 0,
        replaceText: replaceText,
        onReplace: onReplace,
        onReplaceAll: onReplaceAll,
        onReplaceTextfieldRefSet: this.setReplaceTextfieldRef,
        onFocusElementRefSet: onFocusElementRefSet,
        onArrowUp: this.setFocusToFind,
        dispatchAnalyticsEvent: dispatchAnalyticsEvent
      })
    )
  }
}

export default FindReplace
