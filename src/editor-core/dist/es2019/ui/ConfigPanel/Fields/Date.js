import _extends from "@babel/runtime/helpers/extends";
import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Field } from '@atlaskit/form';
import { DatePicker } from '@atlaskit/datetime-picker';
import FieldMessages from '../FieldMessages';
import { validate, getSafeParentedName } from '../utils';

const Date = function ({
  field,
  onBlur,
  autoFocus,
  intl,
  placeholder,
  parentName
}) {
  const element = /*#__PURE__*/React.createElement(Field, {
    name: getSafeParentedName(field.name, parentName),
    label: field.label,
    defaultValue: field.defaultValue || '',
    isRequired: field.isRequired,
    validate: value => validate(field, value || '')
  }, ({
    fieldProps,
    error,
    valid
  }) => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(DatePicker, _extends({}, fieldProps, {
    autoFocus: autoFocus,
    onBlur: () => {
      fieldProps.onBlur();
      onBlur(field.name);
    },
    locale: intl.locale,
    placeholder: placeholder
  })), /*#__PURE__*/React.createElement(FieldMessages, {
    error: error,
    description: field.description
  })));
  return element;
};

export default injectIntl(Date);