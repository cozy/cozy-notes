import _extends from "@babel/runtime/helpers/extends";
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Checkbox } from '@atlaskit/checkbox';
import { Field } from '@atlaskit/form';
import Toggle from '@atlaskit/toggle';
import { getSafeParentedName } from '../utils';
import { ValidationError } from '../types';
import FieldMessages from '../FieldMessages';

function isChecked(value) {
  if (typeof value === 'string') {
    return value === 'true';
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return false;
}

const ToggleFieldWrapper = styled.div`
  display: flex;
`;
const ToggleLabel = styled.label`
  display: flex;
  padding: 3px 3px 3px 0px;
  flex-grow: 1;
`;
const RequiredIndicator = styled.span`
  color: #bf2600;
`;

function BooleanToggle({
  label,
  defaultValue,
  ...fieldProps
}) {
  const {
    id,
    isRequired,
    value
  } = fieldProps;
  return /*#__PURE__*/React.createElement(ToggleFieldWrapper, null, /*#__PURE__*/React.createElement(ToggleLabel, {
    id: id,
    htmlFor: id
  }, label, isRequired ? /*#__PURE__*/React.createElement(RequiredIndicator, {
    "aria-hidden": "true"
  }, "*") : null), /*#__PURE__*/React.createElement(Toggle, _extends({}, fieldProps, {
    defaultChecked: defaultValue,
    value: value ? 'true' : 'false'
  })));
}

function validate(value, isRequired) {
  if (isRequired && !value) {
    return ValidationError.Required;
  }
}

export default function Boolean({
  field,
  onBlur,
  parentName
}) {
  const {
    name,
    label,
    description,
    isRequired = false,
    defaultValue = false
  } = field;
  const showToggle = field.style === 'toggle'; // WARNING: strings were previously used for booleans, protect that here

  const defaultIsChecked = isChecked(defaultValue);
  return /*#__PURE__*/React.createElement(Field, {
    name: getSafeParentedName(name, parentName),
    isRequired: isRequired,
    validate: value => validate(value, isRequired),
    defaultValue: defaultIsChecked
  }, ({
    fieldProps,
    error
  }) => {
    const {
      value = false
    } = fieldProps;
    const props = { ...fieldProps,
      label,
      onChange: value => {
        if (typeof value === 'boolean') {
          fieldProps.onChange(value);
        } else {
          var _target;

          fieldProps.onChange(value === null || value === void 0 ? void 0 : (_target = value.target) === null || _target === void 0 ? void 0 : _target.checked);
        }

        onBlur(name);
      },
      value
    };
    return /*#__PURE__*/React.createElement(Fragment, null, showToggle ? /*#__PURE__*/React.createElement(BooleanToggle, _extends({}, props, {
      defaultValue: defaultIsChecked
    })) : /*#__PURE__*/React.createElement(Checkbox, _extends({}, props, {
      value: value ? 'true' : 'false'
    })), /*#__PURE__*/React.createElement(FieldMessages, {
      error: error,
      description: description
    }));
  });
}