import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import Textfield from '@atlaskit/textfield'
import { SectionWrapper, ReplaceSectionButton } from './styles'
import {
  EVENT_TYPE,
  ACTION,
  ACTION_SUBJECT,
  TRIGGER_METHOD
} from '../../analytics/types'
const messages = defineMessages({
  replaceWith: {
    id: 'fabric.editor.replaceWith',
    defaultMessage: 'Replace with',
    description:
      'The value that will replace the word or phrase that was searched for'
  },
  replace: {
    id: 'fabric.editor.replace',
    defaultMessage: 'Replace',
    description:
      'Replace only the currently selected instance of the word or phrase'
  },
  replaceAll: {
    id: 'fabric.editor.replaceAll',
    defaultMessage: 'Replace all',
    description:
      'Replace all instances of the word or phrase throughout the entire document'
  }
})

class Replace extends React.PureComponent {
  constructor(props) {
    super(props)

    _defineProperty(
      this,
      'replaceTextfieldRef',
      /*#__PURE__*/ React.createRef()
    )

    _defineProperty(this, 'skipWhileComposing', fn => {
      if (this.state.isComposing) {
        return
      }

      fn()
    })

    _defineProperty(this, 'handleReplaceClick', () =>
      this.skipWhileComposing(() => {
        this.props.onReplace({
          triggerMethod: TRIGGER_METHOD.BUTTON,
          replaceText: this.state.replaceText
        })
      })
    )

    _defineProperty(this, 'handleReplaceChange', event =>
      this.skipWhileComposing(() => {
        this.updateReplaceValue(event.target.value)
      })
    )

    _defineProperty(this, 'updateReplaceValue', replaceText => {
      const { dispatchAnalyticsEvent } = this.props

      if (dispatchAnalyticsEvent) {
        dispatchAnalyticsEvent({
          eventType: EVENT_TYPE.TRACK,
          action: ACTION.CHANGED_REPLACEMENT_TEXT,
          actionSubject: ACTION_SUBJECT.FIND_REPLACE_DIALOG
        })
      }

      this.setState({
        replaceText
      })
    })

    _defineProperty(this, 'handleReplaceKeyDown', event =>
      this.skipWhileComposing(() => {
        if (event.key === 'Enter') {
          this.props.onReplace({
            triggerMethod: TRIGGER_METHOD.KEYBOARD,
            replaceText: this.state.replaceText
          })
        } else if (event.key === 'ArrowUp') {
          // we want to move focus between find & replace texfields when user hits up/down arrows
          this.props.onArrowUp()
        }
      })
    )

    _defineProperty(this, 'handleReplaceAllClick', () =>
      this.skipWhileComposing(() => {
        this.props.onReplaceAll({
          replaceText: this.state.replaceText
        })
      })
    )

    _defineProperty(this, 'handleReplaceFocus', () => {
      this.props.onFocusElementRefSet(this.replaceTextfieldRef)
    })

    _defineProperty(this, 'handleCompositionStart', () => {
      this.setState({
        isComposing: true
      })
    })

    _defineProperty(this, 'handleCompositionEnd', event => {
      this.setState({
        isComposing: false
      }) // type for React.CompositionEvent doesn't set type for target correctly

      this.updateReplaceValue(event.target.value)
    })

    const {
      replaceText: _replaceText,
      intl: { formatMessage }
    } = props
    this.state = {
      replaceText: _replaceText || '',
      isComposing: false
    }
    this.replaceWith = formatMessage(messages.replaceWith)
    this.replace = formatMessage(messages.replace)
    this.replaceAll = formatMessage(messages.replaceAll)
  }

  componentDidMount() {
    this.props.onReplaceTextfieldRefSet(this.replaceTextfieldRef)
  }

  componentDidUpdate({ replaceText: prevReplaceText }) {
    const { replaceText } = this.props

    if (replaceText && replaceText !== prevReplaceText) {
      this.setState({
        replaceText,
        isComposing: false
      })
    }
  }

  render() {
    const { replaceText } = this.state
    const { canReplace } = this.props
    return /*#__PURE__*/ React.createElement(
      SectionWrapper,
      null,
      /*#__PURE__*/ React.createElement(Textfield, {
        name: 'replace',
        appearance: 'none',
        placeholder: this.replaceWith,
        defaultValue: replaceText,
        ref: this.replaceTextfieldRef,
        autoComplete: 'off',
        onChange: this.handleReplaceChange,
        onKeyDown: this.handleReplaceKeyDown,
        onFocus: this.handleReplaceFocus,
        onCompositionStart: this.handleCompositionStart,
        onCompositionEnd: this.handleCompositionEnd
      }),
      /*#__PURE__*/ React.createElement(
        ReplaceSectionButton,
        {
          testId: this.replace,
          onClick: this.handleReplaceClick,
          isDisabled: !canReplace
        },
        this.replace
      ),
      /*#__PURE__*/ React.createElement(
        ReplaceSectionButton,
        {
          testId: this.replaceAll,
          onClick: this.handleReplaceAllClick,
          isDisabled: !canReplace
        },
        this.replaceAll
      )
    )
  }
}

export default injectIntl(Replace)
