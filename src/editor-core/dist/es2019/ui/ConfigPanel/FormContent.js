import React, { Fragment } from 'react'
import { isFieldset } from '@atlaskit/editor-common/extensions'
import Boolean from './Fields/Boolean'
import CustomSelect from './Fields/CustomSelect'
import Date from './Fields/Date'
import DateRange from './Fields/DateRange'
import Enum from './Fields/Enum' // eslint-disable-next-line import/no-cycle

import Fieldset from './Fields/Fieldset'
import Number from './Fields/Number'
import String from './Fields/String'
import UnhandledType from './Fields/UnhandledType'
import UserSelect from './Fields/UserSelect'
import RemovableField from './NestedForms/RemovableField'

function FieldComponent({
  field,
  parentName,
  parameters,
  extensionManifest,
  firstVisibleFieldName,
  onBlur
}) {
  var _parameters$errors

  const { name } = field
  const autoFocus = name === firstVisibleFieldName

  if (!isFieldset(field)) {
    field.defaultValue = (parameters && parameters[name]) || field.defaultValue
  }

  switch (field.type) {
    case 'string':
      return /*#__PURE__*/ React.createElement(String, {
        parentName: parentName,
        field: field,
        autoFocus: autoFocus,
        onBlur: onBlur,
        placeholder: field.placeholder
      })

    case 'number':
      return /*#__PURE__*/ React.createElement(Number, {
        parentName: parentName,
        field: field,
        autoFocus: autoFocus,
        onBlur: onBlur,
        placeholder: field.placeholder
      })

    case 'boolean':
      return /*#__PURE__*/ React.createElement(Boolean, {
        parentName: parentName,
        field: field,
        onBlur: onBlur
      })

    case 'date':
      return /*#__PURE__*/ React.createElement(Date, {
        parentName: parentName,
        field: field,
        autoFocus: autoFocus,
        onBlur: onBlur,
        placeholder: field.placeholder
      })

    case 'date-range':
      return /*#__PURE__*/ React.createElement(DateRange, {
        parentName: parentName,
        field: field,
        autoFocus: autoFocus,
        onBlur: onBlur
      })

    case 'enum':
      return /*#__PURE__*/ React.createElement(Enum, {
        parentName: parentName,
        field: field,
        autoFocus: autoFocus,
        onBlur: onBlur
      })

    case 'custom':
      return /*#__PURE__*/ React.createElement(CustomSelect, {
        parentName: parentName,
        field: field,
        extensionManifest: extensionManifest,
        placeholder: field.placeholder,
        autoFocus: autoFocus,
        onBlur: onBlur
      })

    case 'fieldset':
      return /*#__PURE__*/ React.createElement(Fieldset, {
        field: field,
        firstVisibleFieldName: firstVisibleFieldName,
        onFieldBlur: onBlur,
        extensionManifest: extensionManifest,
        parameters: (parameters && parameters[field.name]) || {},
        error:
          parameters === null || parameters === void 0
            ? void 0
            : (_parameters$errors = parameters.errors) === null ||
              _parameters$errors === void 0
            ? void 0
            : _parameters$errors[field.name]
      })

    case 'user':
      return /*#__PURE__*/ React.createElement(UserSelect, {
        field: field,
        autoFocus: field.name === firstVisibleFieldName,
        extensionManifest: extensionManifest,
        onBlur: onBlur
      })

    default:
      return /*#__PURE__*/ React.createElement(UnhandledType, {
        field: field, // @ts-ignore, not possible, but maybe Typescript is wrong
        errorMessage: `Field "${name}" of type "${field.type}" not supported`
      })
  }
}

function Hidden({ children }) {
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      style: {
        display: 'none'
      }
    },
    children
  )
}

export default function FormContent({
  fields,
  parentName,
  parameters,
  extensionManifest,
  canRemoveFields,
  onClickRemove,
  onFieldBlur,
  firstVisibleFieldName
}) {
  return /*#__PURE__*/ React.createElement(
    Fragment,
    null,
    fields.map(field => {
      const { name } = field
      let fieldElement = /*#__PURE__*/ React.createElement(FieldComponent, {
        field: field,
        parentName: parentName,
        parameters: parameters,
        extensionManifest: extensionManifest,
        firstVisibleFieldName: firstVisibleFieldName,
        onBlur: onFieldBlur
      }) // only to be supported by String fields at this time

      if ('isHidden' in field && field.isHidden) {
        fieldElement = /*#__PURE__*/ React.createElement(
          Hidden,
          null,
          fieldElement
        )
      }

      return /*#__PURE__*/ React.createElement(
        RemovableField,
        {
          key: name,
          name: name,
          canRemoveField: canRemoveFields,
          onClickRemove: onClickRemove
        },
        fieldElement
      )
    })
  )
}
