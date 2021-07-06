import _extends from '@babel/runtime/helpers/extends'
import React, { Fragment } from 'react'
import { Checkbox } from '@atlaskit/checkbox'
import { CheckboxField, Fieldset } from '@atlaskit/form'
import { getSafeParentedName } from '../utils'
import FieldMessages from '../FieldMessages'
export default function CheckboxGroup({ field, onBlur, parentName }) {
  return /*#__PURE__*/ React.createElement(
    Fieldset,
    {
      legend: field.label
    },
    field.items.map(option =>
      /*#__PURE__*/ React.createElement(
        CheckboxField,
        {
          key: field.name + option.value,
          name: getSafeParentedName(field.name, parentName),
          value: option.value,
          isRequired: field.isRequired,
          defaultIsChecked:
            (field.defaultValue && field.defaultValue.includes(option.value)) ||
            false
        },
        ({ fieldProps, error }) => {
          const onChange = value => {
            fieldProps.onChange(value)
            onBlur(field.name)
          }

          return /*#__PURE__*/ React.createElement(
            Fragment,
            null,
            /*#__PURE__*/ React.createElement(
              Checkbox,
              _extends({}, fieldProps, {
                onChange: onChange,
                label: option.label
              })
            ),
            /*#__PURE__*/ React.createElement(FieldMessages, {
              error: error
            })
          )
        }
      )
    )
  )
}
