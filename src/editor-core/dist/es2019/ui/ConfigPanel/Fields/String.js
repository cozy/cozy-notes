import _extends from "@babel/runtime/helpers/extends";
import React, { Fragment } from 'react';
import { Field } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';
import FieldMessages from '../FieldMessages';
import { validate, getSafeParentedName } from '../utils';
export default function String({
  field,
  autoFocus,
  onBlur,
  placeholder,
  parentName
}) {
  const {
    name,
    label,
    description,
    defaultValue,
    isRequired
  } = field;
  return /*#__PURE__*/React.createElement(Field, {
    name: getSafeParentedName(name, parentName),
    label: label,
    defaultValue: defaultValue || '',
    isRequired: isRequired,
    validate: value => validate(field, value || '')
  }, ({
    fieldProps,
    error,
    valid
  }) => {
    if (field.style === 'multiline') {
      const {
        onChange,
        ...restFieldProps
      } = fieldProps;
      const {
        options
      } = field;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(TextArea, _extends({}, restFieldProps, options, {
        onChange: e => {
          fieldProps.onChange(e.target.value);
        },
        onBlur: () => {
          fieldProps.onBlur();
          onBlur(name);
        },
        placeholder: placeholder
      })), /*#__PURE__*/React.createElement(FieldMessages, {
        error: error,
        description: description
      }));
    }

    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(TextField, _extends({}, fieldProps, {
      type: "text",
      autoFocus: autoFocus,
      onBlur: () => {
        fieldProps.onBlur();
        onBlur(name);
      },
      placeholder: placeholder
    })), /*#__PURE__*/React.createElement(FieldMessages, {
      error: error,
      description: description
    }));
  });
}