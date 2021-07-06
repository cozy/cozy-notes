import React from 'react'
import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import Select from './Select'
export default function Enum({ field, autoFocus, onBlur, parentName }) {
  const { name } = field

  switch (field.style) {
    case 'checkbox':
      return /*#__PURE__*/ React.createElement(CheckboxGroup, {
        key: name,
        parentName: parentName,
        field: field,
        onBlur: onBlur
      })

    case 'radio':
      return /*#__PURE__*/ React.createElement(RadioGroup, {
        key: name,
        parentName: parentName,
        field: field,
        onBlur: onBlur
      })

    case 'select':
      return /*#__PURE__*/ React.createElement(Select, {
        key: name,
        parentName: parentName,
        field: field,
        onBlur: onBlur,
        placeholder: field.placeholder,
        autoFocus: autoFocus
      })
  }
}
