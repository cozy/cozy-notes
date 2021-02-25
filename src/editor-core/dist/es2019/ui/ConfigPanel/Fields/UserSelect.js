import _extends from "@babel/runtime/helpers/extends";
import React, { useEffect, useState } from 'react';
import { Field } from '@atlaskit/form';
import { SmartUserPicker } from '@atlaskit/user-picker';
import { getUserFieldContextProvider } from '@atlaskit/editor-common/extensions';
import UnhandledType from './UnhandledType';
import FieldMessages from '../FieldMessages';

function makeCompat(defaultValue) {
  if (!defaultValue) {
    return null;
  }

  if (Array.isArray(defaultValue)) {
    return defaultValue.map(id => ({
      type: 'user',
      id
    }));
  }

  return {
    type: 'user',
    id: defaultValue
  };
}

function makeSafe(value) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    const ids = [];

    for (const {
      id
    } of value) {
      ids.push(id);
    }

    return ids;
  }

  return value.id;
}

export default function UserSelect({
  autoFocus,
  extensionManifest,
  field,
  onBlur
}) {
  const [context, setContext] = useState({});
  const {
    name,
    label,
    defaultValue,
    description,
    placeholder,
    isMultiple,
    isRequired,
    options
  } = field;
  const {
    type
  } = options.provider;
  const {
    siteId,
    principalId,
    fieldId,
    productKey,
    containerId,
    objectId,
    childObjectId,
    productAttributes,
    includeUsers = true,
    includeGroups = false,
    includeTeams = false
  } = context;
  useEffect(() => {
    async function fetchContext() {
      try {
        const context = await (await getUserFieldContextProvider(extensionManifest, field.options.provider))();
        setContext(context);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    fetchContext();
  }, [extensionManifest, field.options.provider]);
  return /*#__PURE__*/React.createElement(Field, {
    name: name,
    label: label,
    isRequired: isRequired,
    defaultValue: defaultValue,
    validate: value => {}
  }, ({
    fieldProps,
    error
  }) => {
    // if any of these don't exists, the provider is missing
    if (!siteId || !principalId || !fieldId || !productKey) {
      return /*#__PURE__*/React.createElement(UnhandledType, {
        key: name,
        field: field,
        errorMessage: `Field "${name}" can't be renderered. Missing provider for "${type}".`
      });
    }

    function onChange(value) {
      fieldProps.onChange(makeSafe(value));
      onBlur(name);
    }

    const {
      value,
      ...fieldPropsRest
    } = fieldProps;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SmartUserPicker, _extends({}, fieldPropsRest, {
      onChange: onChange,
      autoFocus: autoFocus,
      onBlur: () => onBlur(name),
      defaultValue: makeCompat(value),
      maxOptions: 10,
      isClearable: true,
      isMulti: isMultiple,
      includeUsers: includeUsers,
      includeGroups: includeGroups,
      includeTeams: includeTeams,
      fieldId: fieldId,
      principalId: principalId,
      siteId: siteId,
      productKey: productKey,
      objectId: objectId,
      containerId: containerId,
      childObjectId: childObjectId,
      placeholder: placeholder,
      productAttributes: productAttributes,
      width: "100%"
    })), /*#__PURE__*/React.createElement(FieldMessages, {
      error: error,
      description: description
    }));
  });
}