import _extends from "@babel/runtime/helpers/extends";
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Field } from '@atlaskit/form';
import { RadioGroup } from '@atlaskit/radio';
import { DatePicker } from '@atlaskit/datetime-picker';
import TextField from '@atlaskit/textfield';
import { messages } from '../messages';
import FieldMessages from '../FieldMessages';
import { validate, validateRequired, getSafeParentedName } from '../utils';
const HorizontalFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const HorizontalFieldWrapper = styled.div`
  flex-basis: 47%;
`;
const Hidden = styled.div`
  display: none;
`;

const getFromDefaultValue = (field, attribute) => {
  if (field.defaultValue) {
    return field.defaultValue[attribute];
  }
};

const DateField = ({
  parentField,
  scope,
  fieldName,
  onBlur,
  intl
}) => /*#__PURE__*/React.createElement(HorizontalFieldWrapper, {
  key: fieldName
}, /*#__PURE__*/React.createElement(Field, {
  name: `${scope}.${fieldName}`,
  label: intl.formatMessage(messages[fieldName]),
  defaultValue: getFromDefaultValue(parentField, fieldName),
  isRequired: true,
  validate: value => validateRequired({
    isRequired: true
  }, value)
}, ({
  fieldProps,
  error
}) => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(DatePicker, _extends({}, fieldProps, {
  onChange: date => {
    fieldProps.onChange(date);
    onBlur(parentField.name);
  },
  locale: intl.locale
})), /*#__PURE__*/React.createElement(FieldMessages, {
  error: error
}))));

const DateRange = function ({
  field,
  onBlur,
  intl,
  parentName
}) {
  const items = useMemo(() => {
    return [...(field.items || []), {
      label: intl.formatMessage(messages.custom),
      value: 'custom'
    }].map(option => ({ ...option,
      name: field.name
    }));
  }, [field.items, field.name, intl]);
  const [currentValue, setCurrentValue] = useState(getFromDefaultValue(field, 'value') || items[0].value);
  useEffect(() => {
    // calling onBlur here based on the currentValue changing will ensure that we
    // get the most up to date value after the form has been rendered
    onBlur(field.name);
  }, [currentValue, onBlur, field.name]);
  const fieldName = getSafeParentedName(field.name, parentName);
  const element = /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Hidden, null, /*#__PURE__*/React.createElement(Field, {
    name: `${fieldName}.type`,
    defaultValue: 'date-range'
  }, ({
    fieldProps
  }) => /*#__PURE__*/React.createElement(TextField, _extends({}, fieldProps, {
    type: "hidden"
  })))), /*#__PURE__*/React.createElement(Field, {
    name: `${fieldName}.value`,
    label: field.label,
    defaultValue: currentValue,
    isRequired: field.isRequired,
    validate: value => validate(field, value || '')
  }, ({
    fieldProps,
    error,
    valid
  }) => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(RadioGroup, _extends({}, fieldProps, {
    options: items,
    onChange: event => {
      fieldProps.onChange(event.target.value);
      setCurrentValue(event.target.value);
    }
  })), /*#__PURE__*/React.createElement(FieldMessages, {
    error: error
  }))), currentValue !== 'custom' ? /*#__PURE__*/React.createElement(Hidden, null, /*#__PURE__*/React.createElement(Field, {
    name: `${fieldName}.from`,
    defaultValue: currentValue
  }, ({
    fieldProps
  }) => /*#__PURE__*/React.createElement(TextField, _extends({}, fieldProps, {
    type: "hidden"
  })))) : /*#__PURE__*/React.createElement(HorizontalFields, null, /*#__PURE__*/React.createElement(DateField, {
    scope: fieldName,
    parentField: field,
    fieldName: "from",
    onBlur: onBlur,
    intl: intl
  }), /*#__PURE__*/React.createElement(DateField, {
    scope: fieldName,
    parentField: field,
    fieldName: "to",
    onBlur: onBlur,
    intl: intl
  })), /*#__PURE__*/React.createElement(FieldMessages, {
    description: field.description
  }));
  return element;
};

export default injectIntl(DateRange);