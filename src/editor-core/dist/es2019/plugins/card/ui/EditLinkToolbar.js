import React from 'react'
import HyperlinkToolbar from '../../hyperlink/ui/HyperlinkAddToolbar'
import { showLinkToolbar, hideLinkToolbar } from '../pm-plugins/actions'
import {
  RECENT_SEARCH_HEIGHT_IN_PX,
  RECENT_SEARCH_WIDTH_IN_PX
} from '../../../ui/LinkSearch/ToolbarComponents'
import { changeSelectedCardToLink, updateCard } from '../pm-plugins/doc'
import { findCardInfo, displayInfoForCard } from '../utils'
export class EditLinkToolbar extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.node !== this.props.node) {
      this.hideLinkToolbar()
    }
  }

  componentWillUnmount() {
    this.hideLinkToolbar()
  }

  hideLinkToolbar() {
    const { view } = this.props
    view.dispatch(hideLinkToolbar(view.state.tr))
  }

  render() {
    const { providerFactory, url, text, view, onSubmit } = this.props
    return /*#__PURE__*/ React.createElement(HyperlinkToolbar, {
      view: view,
      providerFactory: providerFactory,
      displayUrl: url,
      displayText: text,
      onSubmit: (href, title, displayText) => {
        this.hideLinkToolbar()

        if (onSubmit) {
          onSubmit(href, displayText || title)
        }
      }
    })
  }
}
export const editLink = (state, dispatch) => {
  if (dispatch) {
    dispatch(showLinkToolbar(state.tr))
    return true
  }

  return false
}
export const buildEditLinkToolbar = ({ providerFactory, node }) => {
  return {
    type: 'custom',
    render: (view, idx) => {
      if (!view || !providerFactory) {
        return null
      }

      const displayInfo = displayInfoForCard(node, findCardInfo(view.state))
      return /*#__PURE__*/ React.createElement(EditLinkToolbar, {
        key: idx,
        view: view,
        providerFactory: providerFactory,
        url: displayInfo.url,
        text: displayInfo.title || '',
        node: node,
        onSubmit: (newHref, newText) => {
          // Completely new link - could be a Smart Link, the title and href point
          // to different destinations.
          if (newText !== displayInfo.title && newHref !== displayInfo.url) {
            return updateCard(newHref)(view.state, view.dispatch)
          } else if (
            newText !== displayInfo.title ||
            newHref !== displayInfo.url
          ) {
            // we don't support changing link text or href on a smart link,
            // downgrade to hyperlink
            return changeSelectedCardToLink(newText, newHref)(
              view.state,
              view.dispatch
            )
          }

          return
        }
      })
    }
  }
}
export const editLinkToolbarConfig = {
  height: RECENT_SEARCH_HEIGHT_IN_PX,
  width: RECENT_SEARCH_WIDTH_IN_PX,
  forcePlacement: true
}
