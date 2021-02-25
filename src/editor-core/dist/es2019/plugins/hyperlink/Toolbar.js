import React from 'react';
import { stateKey } from './pm-plugins/main';
import { removeLink, setLinkText, insertLink, editInsertedLink, hideLinkToolbar, setLinkHref, updateLink, insertLinkWithAnalytics } from './commands';
import HyperlinkAddToolbar from './ui/HyperlinkAddToolbar';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { normalizeUrl } from './utils';
import { linkToolbarMessages as linkToolbarCommonMessages, linkMessages } from '../../messages';
import { isSafeUrl } from '@atlaskit/adf-schema';
import { RECENT_SEARCH_HEIGHT_IN_PX, RECENT_SEARCH_WIDTH_IN_PX } from '../../ui/LinkSearch/ToolbarComponents';
import { HyperlinkToolbarAppearance } from './HyperlinkToolbarAppearance';
/* type guard for edit links */

function isEditLink(linkMark) {
  return linkMark.pos !== undefined;
}

function getLinkText(activeLinkMark, state) {
  if (!activeLinkMark.node) {
    return undefined;
  }

  const textToUrl = normalizeUrl(activeLinkMark.node.text);
  const linkMark = activeLinkMark.node.marks.find(mark => mark.type === state.schema.marks.link);
  const linkHref = linkMark && linkMark.attrs.href;

  if (textToUrl === linkHref) {
    return undefined;
  }

  return activeLinkMark.node.text;
}

const handleBlur = (activeLinkMark, view) => (type, url, title, displayText, isTabPressed) => {
  const text = title || displayText;

  switch (type) {
    case 'url':
      {
        if (url) {
          return setLinkHref(url, isEditLink(activeLinkMark) ? activeLinkMark.pos : activeLinkMark.from, isEditLink(activeLinkMark) ? undefined : activeLinkMark.to, isTabPressed)(view.state, view.dispatch);
        }

        if (isEditLink(activeLinkMark) && activeLinkMark.node && !url) {
          removeLink(activeLinkMark.pos)(view.state, view.dispatch);
        }

        return hideLinkToolbar()(view.state, view.dispatch);
      }

    case 'text':
      {
        if (text && url) {
          return activeLinkMark.type === 'INSERT' ? insertLink(activeLinkMark.from, activeLinkMark.to, url, undefined, text)(view.state, view.dispatch) : setLinkText(text, activeLinkMark.pos)(view.state, view.dispatch);
        }

        return hideLinkToolbar()(view.state, view.dispatch);
      }

    default:
      {
        return hideLinkToolbar()(view.state, view.dispatch);
      }
  }
};

export const getToolbarConfig = (state, intl, providerFactory, cardOptions) => {
  const {
    formatMessage
  } = intl;
  const linkState = stateKey.getState(state);

  if (linkState && linkState.activeLinkMark) {
    const {
      activeLinkMark
    } = linkState;
    const hyperLinkToolbar = {
      title: 'Hyperlink floating controls',
      nodeType: [state.schema.nodes.text, state.schema.nodes.paragraph, state.schema.nodes.heading, state.schema.nodes.taskItem, state.schema.nodes.decisionItem].filter(nodeType => !!nodeType),
      // Use only the node types existing in the schema ED-6745
      align: 'left',
      className: activeLinkMark.type.match('INSERT|EDIT_INSERTED') ? 'hyperlink-floating-toolbar' : ''
    };

    switch (activeLinkMark.type) {
      case 'EDIT':
        {
          const {
            pos,
            node
          } = activeLinkMark;
          const linkMark = node.marks.filter(mark => mark.type === state.schema.marks.link);
          const link = linkMark[0] && linkMark[0].attrs.href;
          const isValidUrl = isSafeUrl(link);
          const labelOpenLink = formatMessage(isValidUrl ? linkMessages.openLink : linkToolbarCommonMessages.unableToOpenLink);
          const labelUnlink = formatMessage(linkToolbarCommonMessages.unlink);
          const editLink = formatMessage(linkToolbarCommonMessages.editLink);
          return { ...hyperLinkToolbar,
            height: 32,
            width: 250,
            items: [{
              type: 'custom',
              render: editorView => {
                return /*#__PURE__*/React.createElement(HyperlinkToolbarAppearance, {
                  key: "link-appearance",
                  url: link,
                  intl: intl,
                  editorView: editorView,
                  editorState: state,
                  cardOptions: cardOptions,
                  providerFactory: providerFactory // platform={} // TODO: pass platform

                });
              }
            }, {
              type: 'button',
              onClick: editInsertedLink(),
              selected: false,
              title: editLink,
              showTitle: true
            }, {
              type: 'separator'
            }, {
              type: 'button',
              disabled: !isValidUrl,
              target: '_blank',
              href: isValidUrl ? link : undefined,
              onClick: () => true,
              selected: false,
              title: labelOpenLink,
              icon: OpenIcon,
              className: 'hyperlink-open-link'
            }, {
              type: 'separator'
            }, {
              type: 'button',
              onClick: removeLink(pos),
              selected: false,
              title: labelUnlink,
              icon: UnlinkIcon
            }]
          };
        }

      case 'EDIT_INSERTED':
      case 'INSERT':
        {
          let link;

          if (isEditLink(activeLinkMark) && activeLinkMark.node) {
            const linkMark = activeLinkMark.node.marks.filter(mark => mark.type === state.schema.marks.link);
            link = linkMark[0] && linkMark[0].attrs.href;
          }

          const displayText = isEditLink(activeLinkMark) ? getLinkText(activeLinkMark, state) : linkState.activeText;
          return { ...hyperLinkToolbar,
            height: RECENT_SEARCH_HEIGHT_IN_PX,
            width: RECENT_SEARCH_WIDTH_IN_PX,
            items: [{
              type: 'custom',
              render: (view, idx) => {
                if (!view) {
                  return null;
                }

                return /*#__PURE__*/React.createElement(HyperlinkAddToolbar, {
                  view: view,
                  key: idx,
                  displayUrl: link,
                  displayText: displayText || '',
                  providerFactory: providerFactory,
                  onSubmit: (href, title = '', displayText, inputMethod) => {
                    isEditLink(activeLinkMark) ? updateLink(href, displayText || title, activeLinkMark.pos)(view.state, view.dispatch) : insertLinkWithAnalytics(inputMethod, activeLinkMark.from, activeLinkMark.to, href, title, displayText)(view.state, view.dispatch);
                    view.focus();
                  },
                  onBlur: handleBlur(activeLinkMark, view)
                });
              }
            }]
          };
        }
    }
  }

  return;
};