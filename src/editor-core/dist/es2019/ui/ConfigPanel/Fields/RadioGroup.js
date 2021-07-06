import _extends from '@babel/runtime/helpers/extends'
import React, { Fragment } from 'react'
import { Field } from '@atlaskit/form'
import { RadioGroup } from '@atlaskit/radio'
import FieldMessages from '../FieldMessages'
import { FieldTypeError } from '../types'
import { validate, getSafeParentedName } from '../utils'
export default function RadioField({ field, onBlur, parentName }) {
  if (field.isMultiple) {
    return /*#__PURE__*/ React.createElement(FieldMessages, {
      error: FieldTypeError.isMultipleAndRadio
    })
  }

  return /*#__PURE__*/ React.createElement(
    Field,
    {
      name: getSafeParentedName(field.name, parentName),
      label: field.label,
      defaultValue: field.defaultValue,
      isRequired: field.isRequired,
      validate: value => validate(field, value)
    },
    ({ fieldProps, error }) =>
      /*#__PURE__*/ React.createElement(
        Fragment,
        null,
        /*#__PURE__*/ React.createElement(
          RadioGroup,
          _extends({}, fieldProps, {
            options: (field.items || []).map(option => ({
              ...option,
              name: field.name
            })),
            onChange: value => {
              fieldProps.onChange(value)
              onBlur(field.name)
            }
          })
        ),
        /*#__PURE__*/ React.createElement(FieldMessages, {
          error: error
        })
      )
  )
}
