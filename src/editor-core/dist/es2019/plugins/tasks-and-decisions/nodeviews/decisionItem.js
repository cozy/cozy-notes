import React from 'react'
import { ReactNodeView } from '../../../nodeviews'
import DecisionItem from '../ui/Decision'

class Decision extends ReactNodeView {
  isContentEmpty(node) {
    return node.content.childCount === 0
  }

  createDomRef() {
    const domRef = document.createElement('li')
    domRef.style['list-style-type'] = 'none'
    return domRef
  }

  getContentDOM() {
    const dom = document.createElement('div') // setting a className prevents PM/Chrome mutation observer from
    // incorrectly deleting nodes

    dom.className = 'decision-item'
    return {
      dom
    }
  }

  render(_props, forwardRef) {
    return /*#__PURE__*/ React.createElement(DecisionItem, {
      contentRef: forwardRef,
      showPlaceholder: this.isContentEmpty(this.node)
    })
  }

  viewShouldUpdate(nextNode) {
    /**
     * To ensure the placeholder is correctly toggled we need to allow react to re-render
     * on first character insertion.
     * Note: last character deletion is handled externally and automatically re-renders.
     */
    return this.isContentEmpty(this.node) && !!nextNode.content.childCount
  }

  update(node, decorations) {
    return super.update(
      node,
      decorations, // Toggle the placeholder based on whether user input exists.
      (_currentNode, _newNode) => !this.isContentEmpty(_newNode)
    )
  }
}

export const decisionItemNodeView = (portalProviderAPI, eventDispatcher) => (
  node,
  view,
  getPos
) => {
  return new Decision(
    node,
    view,
    getPos,
    portalProviderAPI,
    eventDispatcher,
    {}
  ).init()
}
