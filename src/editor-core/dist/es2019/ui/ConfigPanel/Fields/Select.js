import _extends from '@babel/runtime/helpers/extends'
import React, { Fragment } from 'react'
import { Field } from '@atlaskit/form'
import Select from '@atlaskit/select'
import FieldMessages from '../FieldMessages'
import { validate, getOptionFromValue, getSafeParentedName } from '../utils'
import { formatOptionLabel } from './SelectItem'
export default function SelectField({
  field,
  onBlur,
  autoFocus,
  placeholder,
  parentName
}) {
  return /*#__PURE__*/ React.createElement(
    Field,
    {
      name: getSafeParentedName(field.name, parentName),
      label: field.label,
      defaultValue: getOptionFromValue(field.items, field.defaultValue),
      isRequired: field.isRequired,
      validate: value => validate(field, value)
    },
    ({ fieldProps, error, valid }) =>
      /*#__PURE__*/ React.createElement(
        Fragment,
        null,
        /*#__PURE__*/ React.createElement(
          Select,
          _extends({}, fieldProps, {
            onChange: value => {
              fieldProps.onChange(value)
              onBlur(field.name)
            },
            isMulti: field.isMultiple || false,
            options: field.items || [],
            isClearable: false,
            validationState: error ? 'error' : 'default',
            formatOptionLabel: formatOptionLabel,
            autoFocus: autoFocus,
            placeholder: placeholder
          })
        ),
        /*#__PURE__*/ React.createElement(FieldMessages, {
          error: error,
          description: field.description
        })
      )
  )
}
