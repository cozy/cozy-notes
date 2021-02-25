import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import SectionMessage from '@atlaskit/section-message';
import Button from '@atlaskit/button/custom-theme-button';
import Select from '@atlaskit/select';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import { messages } from '../messages'; // eslint-disable-next-line import/no-cycle

import FormWrapper from '../NestedForms/FormWrapper';

const populateFromParameters = (parameters, fields) => {
  if (Object.keys(parameters).length) {
    const keys = Object.keys(parameters);
    const existingFieldKeys = keys.filter(key => fields.find(field => field.name === key));

    if (existingFieldKeys.length > 0) {
      return existingFieldKeys;
    }
  }
};

const populateWithTheFirst = fields => {
  if (Array.isArray(fields) && fields.length > 0) {
    return [fields[0].name];
  }
};

const getInitialFields = (parameters = {}, fields, isDynamic) => {
  if (!isDynamic) {
    return fields.map(field => field.name);
  }

  return populateFromParameters(parameters, fields) || populateWithTheFirst(fields) || [];
};

class FieldsetField extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getSelectedFields", visibleFields => {
      const {
        field
      } = this.props;
      return [...visibleFields].map(fieldName => field.fields.find(field => field.name === fieldName));
    });

    _defineProperty(this, "getSelectOptions", visibleFields => {
      const {
        field
      } = this.props;
      return field.fields.filter(field => !visibleFields.has(field.name)).map(field => ({
        value: field.name,
        label: field.label
      }));
    });

    _defineProperty(this, "setIsAdding", value => {
      this.setState(state => ({ ...state,
        isAdding: value
      }));
    });

    _defineProperty(this, "setCurrentParameters", parameters => {
      this.setState(state => ({ ...state,
        currentParameters: parameters
      }), // callback required so autosave can be triggered on
      // the right moment if fields are being removed
      () => this.props.onFieldBlur(this.props.field.name));
    });

    _defineProperty(this, "setVisibleFields", fields => {
      this.setState(state => ({ ...state,
        visibleFields: fields,
        selectedFields: this.getSelectedFields(fields),
        selectOptions: this.getSelectOptions(fields)
      }));
    });

    _defineProperty(this, "onSelectItem", option => {
      const {
        visibleFields
      } = this.state;
      this.setVisibleFields(visibleFields.add(option.value));
      this.setIsAdding(false);
    });

    _defineProperty(this, "onClickRemove", fieldName => {
      const {
        visibleFields,
        currentParameters
      } = this.state;
      visibleFields.delete(fieldName);
      this.setVisibleFields(new Set(visibleFields));
      delete currentParameters[fieldName];
      this.setCurrentParameters({ ...currentParameters
      });
    });

    _defineProperty(this, "renderActions", () => {
      const {
        intl
      } = this.props;
      const {
        selectOptions,
        isAdding
      } = this.state;

      if (selectOptions.length === 0) {
        return null;
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, isAdding ? /*#__PURE__*/React.createElement(Select, {
        testId: "field-picker",
        defaultMenuIsOpen: true,
        autoFocus: true,
        placeholder: intl.formatMessage(messages.addField),
        options: selectOptions,
        onChange: option => {
          if (option) {
            this.onSelectItem(option);
          }
        }
      }) : /*#__PURE__*/React.createElement(Button, {
        testId: "add-more",
        appearance: "subtle",
        iconBefore: /*#__PURE__*/React.createElement(AddCircleIcon, {
          size: "small",
          label: intl.formatMessage(messages.addField)
        }),
        onClick: () => this.setIsAdding(true)
      }, intl.formatMessage(messages.addField)));
    });

    const initialFields = new Set(getInitialFields(props.parameters, props.field.fields, props.field.options.isDynamic));
    this.state = {
      isAdding: false,
      currentParameters: props.parameters || {},
      visibleFields: initialFields,
      selectedFields: this.getSelectedFields(initialFields),
      selectOptions: this.getSelectOptions(initialFields)
    };
  }

  render() {
    const {
      field,
      extensionManifest,
      onFieldBlur,
      firstVisibleFieldName,
      error
    } = this.props;
    const {
      selectedFields,
      currentParameters,
      visibleFields
    } = this.state;
    return /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(FieldsetError, {
      message: error
    }), /*#__PURE__*/React.createElement(FormWrapper, {
      canRemoveFields: field.options.isDynamic && visibleFields.size > 1,
      showTitle: field.options.showTitle,
      extensionManifest: extensionManifest,
      parentName: field.name,
      fields: selectedFields,
      label: field.label,
      parameters: currentParameters,
      onClickRemove: this.onClickRemove,
      onFieldBlur: onFieldBlur,
      firstVisibleFieldName: firstVisibleFieldName
    }, this.renderActions()));
  }

}

function FieldsetError({
  message
}) {
  return /*#__PURE__*/React.createElement(SectionMessageWrapper, null, /*#__PURE__*/React.createElement(SectionMessage, {
    appearance: "error"
  }, /*#__PURE__*/React.createElement("p", null, message)));
}

const SectionMessageWrapper = styled.div`
  margin-bottom: 24px;
`;
export default injectIntl(FieldsetField);