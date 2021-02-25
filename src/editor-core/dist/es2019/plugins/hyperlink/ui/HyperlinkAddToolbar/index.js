import React from 'react';
import { WithProviders } from '@atlaskit/editor-common';
import HyperlinkAddToolbarComp from './HyperlinkAddToolbar';
import { stateKey as pluginKey } from '../../pm-plugins/main';
import WithPluginState from '../../../../ui/WithPluginState';
export default class HyperlinkAddToolbar extends React.PureComponent {
  render() {
    const {
      onSubmit,
      onBlur,
      displayText,
      displayUrl,
      providerFactory,
      view
    } = this.props;
    return /*#__PURE__*/React.createElement(WithProviders, {
      providers: ['activityProvider', 'searchProvider'],
      providerFactory: providerFactory,
      renderNode: ({
        activityProvider,
        searchProvider
      }) => /*#__PURE__*/React.createElement(WithPluginState, {
        editorView: view,
        plugins: {
          hyperlinkPluginState: pluginKey
        },
        render: ({
          hyperlinkPluginState
        }) => /*#__PURE__*/React.createElement(HyperlinkAddToolbarComp, {
          activityProvider: activityProvider,
          searchProvider: searchProvider,
          onSubmit: onSubmit,
          onBlur: onBlur,
          displayText: displayText,
          displayUrl: displayUrl,
          pluginState: hyperlinkPluginState,
          view: view
        })
      })
    });
  }

}