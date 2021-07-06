import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { PureComponent } from 'react'
import { Input } from './styles'
import { browser } from '@atlaskit/editor-common'
const KeyZCode = 90
const KeyYCode = 89
export default class PanelTextInput extends PureComponent {
  constructor(props) {
    super(props)

    _defineProperty(this, 'onMouseDown', () => {
      const { onMouseDown } = this.props

      if (onMouseDown) {
        onMouseDown()
      }
    })

    _defineProperty(this, 'onBlur', e => {
      const { onBlur } = this.props

      if (onBlur) {
        onBlur(e)
      }
    })

    _defineProperty(this, 'handleChange', () => {
      const { onChange } = this.props

      if (this.input) {
        this.setState({
          value: this.input.value
        })
      }

      if (onChange && this.input) {
        onChange(this.input.value)
      }
    })

    _defineProperty(this, 'handleKeydown', e => {
      const { onUndo, onRedo, onSubmit, onCancel } = this.props

      if (e.keyCode === 13 && onSubmit) {
        e.preventDefault() // Prevent from submitting if an editor is inside a form.

        onSubmit(this.input.value)
      } else if (e.keyCode === 27 && onCancel) {
        onCancel(e)
      } else if (typeof onUndo === 'function' && this.isUndoEvent(e)) {
        e.preventDefault()
        onUndo()
      } else if (typeof onRedo === 'function' && this.isRedoEvent(e)) {
        e.preventDefault()
        onRedo()
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(e)
      }
    })

    _defineProperty(this, 'handleRef', input => {
      if (input instanceof HTMLInputElement) {
        this.input = input

        if (this.props.autoFocus) {
          // Need this to prevent jumping when we render TextInput inside Portal @see ED-2992
          this.focusTimeoutId = window.setTimeout(() => this.focus())
        }
      } else {
        this.input = undefined
      }
    })

    this.state = {
      value: props.defaultValue || ''
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        value: nextProps.defaultValue
      })
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.focusTimeoutId)
  }

  render() {
    const { placeholder, width, maxLength, testId, ariaLabel } = this.props
    const { value } = this.state
    return /*#__PURE__*/ React.createElement(Input, {
      'data-testid': testId || '',
      type: 'text',
      placeholder: placeholder,
      value: value,
      onChange: this.handleChange,
      onKeyDown: this.handleKeydown,
      onMouseDown: this.onMouseDown,
      onBlur: this.onBlur,
      innerRef: this.handleRef,
      width: width,
      maxLength: maxLength,
      'aria-label': ariaLabel
    })
  }

  focus() {
    const { input } = this

    if (input) {
      const focusOpts =
        typeof this.props.autoFocus === 'object' ? this.props.autoFocus : {}
      input.focus(focusOpts)
    }
  }

  isUndoEvent(event) {
    return (
      event.keyCode === KeyZCode && // cmd + z for mac
      ((browser.mac && event.metaKey && !event.shiftKey) || // ctrl + z for non-mac
        (!browser.mac && event.ctrlKey))
    )
  }

  isRedoEvent(event) {
    return (
      // ctrl + y for non-mac
      (!browser.mac && event.ctrlKey && event.keyCode === KeyYCode) ||
      (browser.mac &&
        event.metaKey &&
        event.shiftKey &&
        event.keyCode === KeyZCode) ||
      (event.ctrlKey && event.shiftKey && event.keyCode === KeyZCode)
    )
  }
}
