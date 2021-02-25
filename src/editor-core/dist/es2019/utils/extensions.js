import React from 'react';
import Loadable from 'react-loadable';
import { combineProviders, getQuickInsertItemsFromModule, resolveImport } from '@atlaskit/editor-common';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, EVENT_TYPE, INPUT_METHOD } from '../plugins/analytics/types/enums';
import { fireAnalyticsEvent } from '../plugins/analytics';
/**
 * Utils to send analytics event when a extension is inserted using quickInsert
 */

function sendExtensionQuickInsertAnalytics(item, createAnalyticsEvent) {
  if (createAnalyticsEvent) {
    fireAnalyticsEvent(createAnalyticsEvent)({
      payload: {
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.EXTENSION,
        attributes: {
          extensionType: item.extensionType,
          key: item.key,
          inputMethod: INPUT_METHOD.QUICK_INSERT
        },
        eventType: EVENT_TYPE.TRACK
      }
    });
  }
}

export async function extensionProviderToQuickInsertProvider(extensionProvider, editorActions, createAnalyticsEvent) {
  const extensions = await extensionProvider.getExtensions();
  return {
    getItems: () => {
      const quickInsertItems = getQuickInsertItemsFromModule(extensions, item => {
        const Icon = Loadable({
          loader: item.icon,
          loading: () => null
        });
        return {
          title: item.title,
          description: item.description,
          icon: () => /*#__PURE__*/React.createElement(Icon, {
            label: item.title
          }),
          keywords: item.keywords,
          featured: item.featured,
          categories: item.categories,
          action: insert => {
            if (typeof item.node === 'function') {
              resolveImport(item.node()).then(node => {
                sendExtensionQuickInsertAnalytics(item, createAnalyticsEvent);

                if (node) {
                  editorActions.replaceSelection(node);
                }
              });
              return insert('');
            } else {
              sendExtensionQuickInsertAnalytics(item, createAnalyticsEvent);
              return insert(item.node);
            }
          }
        };
      });
      return Promise.all(quickInsertItems);
    }
  };
}
export async function combineQuickInsertProviders(quickInsertProviders) {
  const {
    invokeList
  } = combineProviders(quickInsertProviders);
  return {
    getItems() {
      return invokeList('getItems');
    }

  };
}