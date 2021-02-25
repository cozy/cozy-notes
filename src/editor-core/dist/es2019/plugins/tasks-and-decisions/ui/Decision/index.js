import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { DecisionItem } from '@atlaskit/task-decision';
const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.decisionPlaceholder',
    defaultMessage: 'Add a decision…',
    description: 'Placeholder description for an empty decision in the editor'
  }
});
export class Decision extends React.Component {
  render() {
    const {
      contentRef,
      showPlaceholder,
      intl: {
        formatMessage
      }
    } = this.props;
    const placeholder = formatMessage(messages.placeholder);
    return /*#__PURE__*/React.createElement(DecisionItem, {
      contentRef: contentRef,
      placeholder: placeholder,
      showPlaceholder: showPlaceholder
    });
  }

}

_defineProperty(Decision, "displayName", 'Decision');

export default injectIntl(Decision);