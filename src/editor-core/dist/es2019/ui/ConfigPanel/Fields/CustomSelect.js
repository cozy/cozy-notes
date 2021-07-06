import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { messages } from '../messages'
import { Field } from '@atlaskit/form'
import { AsyncCreatableSelect } from '@atlaskit/select'
import { formatOptionLabel } from './SelectItem'
import { getCustomFieldResolver } from '@atlaskit/editor-common/extensions'
import UnhandledType from './UnhandledType'
import FieldMessages from '../FieldMessages'
import { validate, getSafeParentedName } from '../utils'

function FieldError({ field }) {
  const { type } = field.options.resolver
  return /*#__PURE__*/ React.createElement(UnhandledType, {
    key: field.name,
    field: field,
    errorMessage: `Field "${field.name}" can't be renderered. Missing resolver for "${type}".`
  })
}

class CustomSelect extends React.Component {
  constructor(props) {
    super(props)

    _defineProperty(this, 'setDefaultValue', defaultValue => {
      this.setState(state => ({ ...state, defaultValue }))
    })

    this.state = {
      isMissingResolver: false
    }
  }

  async componentDidMount() {
    await this.getResolver()
    await this.fetchDefaultValues()
  }

  async getResolver() {
    const { extensionManifest, field } = this.props

    try {
      const resolver = await getCustomFieldResolver(
        extensionManifest,
        field.options.resolver
      )
      this.setState(state => ({
        ...state,
        resolver,
        isMissingResolver: !resolver
      }))
    } catch {
      this.setState(state => ({ ...state, isMissingResolver: true }))
    }
  }

  async fetchDefaultValues() {
    const { field } = this.props
    const { resolver } = this.state

    if (!resolver) {
      return
    }

    const options = await resolver(undefined, field.defaultValue)

    if (field.defaultValue && field.isMultiple) {
      this.setDefaultValue(
        options.filter(option => field.defaultValue.includes(option.value))
      )
    }

    if (field.defaultValue && !field.isMultiple) {
      this.setDefaultValue(
        options.find(option => field.defaultValue === option.value) || []
      )
    }
  }

  formatCreateLabel(value) {
    if (!value) {
      return null
    }

    const { intl } = this.props
    const message = intl.formatMessage(messages.createOption)
    return `${message} "${value}"`
  }

  render() {
    const { field, onBlur, autoFocus, placeholder, parentName } = this.props
    const { defaultValue, resolver, isMissingResolver } = this.state
    const { name, label, description, isMultiple, isRequired, options } = field
    const { isCreatable } = options
    return /*#__PURE__*/ React.createElement(
      Field,
      {
        name: getSafeParentedName(name, parentName),
        label: label,
        isRequired: isRequired,
        defaultValue: defaultValue,
        validate: value => validate(field, value)
      },
      ({ fieldProps, error }) =>
        /*#__PURE__*/ React.createElement(
          Fragment,
          null,
          resolver &&
            /*#__PURE__*/ React.createElement(
              Fragment,
              null,
              /*#__PURE__*/ React.createElement(
                AsyncCreatableSelect,
                _extends({}, fieldProps, {
                  onChange: value => {
                    fieldProps.onChange(value)
                    onBlur(name)
                  },
                  isMulti: isMultiple || false,
                  isClearable: true,
                  isValidNewOption: value => isCreatable && value,
                  validationState: error ? 'error' : 'default',
                  defaultOptions: true,
                  formatCreateLabel: value => this.formatCreateLabel(value),
                  formatOptionLabel: formatOptionLabel,
                  loadOptions: searchTerm =>
                    resolver(searchTerm, field.defaultValue),
                  autoFocus: autoFocus,
                  placeholder: placeholder
                })
              ),
              /*#__PURE__*/ React.createElement(FieldMessages, {
                error: error,
                description: description
              })
            ),
          isMissingResolver &&
            /*#__PURE__*/ React.createElement(FieldError, {
              field: field
            })
        )
    )
  }
}

export default injectIntl(CustomSelect)
