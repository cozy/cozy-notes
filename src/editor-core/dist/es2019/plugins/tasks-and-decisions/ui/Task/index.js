import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import TaskItemWithProviders from './task-item-with-providers';
const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.taskPlaceholder',
    defaultMessage: "Type your action, use '@' to assign to someone.",
    description: 'Placeholder description for an empty action/task in the editor'
  }
});
export class TaskItem extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderWithProvider", providers => {
      const {
        providers: _providerFactory,
        intl: {
          formatMessage
        },
        ...otherProps
      } = this.props;
      const {
        taskDecisionProvider,
        contextIdentifierProvider
      } = providers;
      const placeholder = formatMessage(messages.placeholder);
      return /*#__PURE__*/React.createElement(TaskItemWithProviders, _extends({}, otherProps, {
        placeholder: placeholder,
        taskDecisionProvider: taskDecisionProvider,
        contextIdentifierProvider: contextIdentifierProvider
      }));
    });

    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(WithProviders, {
      providers: ['taskDecisionProvider', 'contextIdentifierProvider'],
      providerFactory: this.providerFactory,
      renderNode: this.renderWithProvider
    });
  }

}

_defineProperty(TaskItem, "displayName", 'TaskItem');

export default injectIntl(TaskItem);