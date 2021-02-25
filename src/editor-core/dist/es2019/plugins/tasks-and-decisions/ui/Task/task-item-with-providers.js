import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { ResourcedTaskItem } from '@atlaskit/task-decision';
export default class TaskItemWithProviders extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      resolvedContextProvider: undefined
    });

    _defineProperty(this, "mounted", false);
  }

  UNSAFE_componentWillMount() {
    this.mounted = true;
    this.updateContextIdentifierProvider(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.contextIdentifierProvider !== this.props.contextIdentifierProvider) {
      this.updateContextIdentifierProvider(nextProps);
    }
  }

  async updateContextIdentifierProvider(props) {
    if (props.contextIdentifierProvider) {
      try {
        const resolvedContextProvider = await props.contextIdentifierProvider;

        if (this.mounted) {
          this.setState({
            resolvedContextProvider
          });
        }
      } catch (err) {
        if (this.mounted) {
          this.setState({
            resolvedContextProvider: undefined
          });
        }
      }
    } else {
      this.setState({
        resolvedContextProvider: undefined
      });
    }
  }

  render() {
    const {
      contextIdentifierProvider,
      ...otherProps
    } = this.props;
    const {
      objectId
    } = this.state.resolvedContextProvider || {};
    const userContext = objectId ? 'edit' : 'new';
    return /*#__PURE__*/React.createElement(FabricElementsAnalyticsContext, {
      data: {
        userContext
      }
    }, /*#__PURE__*/React.createElement(ResourcedTaskItem, _extends({}, otherProps, {
      objectAri: objectId
    })));
  }

}

_defineProperty(TaskItemWithProviders, "displayName", 'TaskItemWithProviders');