import _extends from '@babel/runtime/helpers/extends'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { DN50, N0 } from '@atlaskit/theme/colors'
import { themed } from '@atlaskit/theme/components'
import { borderRadius } from '@atlaskit/theme/constants'
import Button from '@atlaskit/button/custom-theme-button'
import Modal, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog'
import ElementBrowser from './components/ElementBrowserLoader'
import { getCategories } from './categories'
import { MODAL_WRAPPER_PADDING } from './constants'

const ModalElementBrowser = props => {
  const [selectedItem, setSelectedItem] = useState()
  const onSelectItem = useCallback(
    item => {
      setSelectedItem(item)
    },
    [setSelectedItem]
  )
  const onInsertItem = useCallback(
    item => {
      props.onInsertItem(item)
    },
    [props]
  )
  const RenderFooter = useCallback(
    footerProps =>
      /*#__PURE__*/ React.createElement(
        Footer,
        _extends({}, footerProps, {
          onInsert: () => onInsertItem(selectedItem)
        })
      ),
    [onInsertItem, selectedItem]
  ) // Since Modal uses stackIndex it's shouldCloseOnEscapePress prop doesn't work.

  const onKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        props.onClose()
      }
    },
    [props]
  )
  const RenderBody = useCallback(
    () =>
      /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        /*#__PURE__*/ React.createElement(ElementBrowser, {
          categories: getCategories(props.intl),
          getItems: props.getItems,
          showSearch: true,
          showCategories: true,
          mode: 'full',
          onSelectItem: onSelectItem,
          onInsertItem: onInsertItem
        })
      ),
    [props.intl, props.getItems, onSelectItem, onInsertItem]
  )
  const components = {
    Body: RenderBody,
    Footer: RenderFooter
  }
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      'data-editor-popup': true,
      onClick: onModalClick,
      onKeyDown: onKeyDown
    },
    /*#__PURE__*/ React.createElement(
      ModalTransition,
      null,
      props.isOpen &&
        /*#__PURE__*/ React.createElement(Modal, {
          stackIndex: 1,
          /** setting stackIndex 1 disables focus control in the modal dialog which was causing conflicts with insertion methods from prosemirror */
          key: 'element-browser-modal',
          onClose: props.onClose,
          height: '664px',
          width: 'x-large',
          autoFocus: false,
          components: components, // defaults to true and doesn't work along with stackIndex=1.
          // packages/design-system/modal-dialog/src/components/Content.tsx Line 287
          shouldCloseOnEscapePress: false
        })
    )
  )
}

ModalElementBrowser.displayName = 'ModalElementBrowser' // Prevent ModalElementBrowser click propagation through to the editor.

const onModalClick = e => e.stopPropagation()

const Footer = ({ onInsert, onClose, showKeyline }) => {
  return /*#__PURE__*/ React.createElement(
    ModalFooter,
    {
      showKeyline: showKeyline,
      style: {
        padding: MODAL_WRAPPER_PADDING
      }
    },
    /*#__PURE__*/ React.createElement('span', null),
    /*#__PURE__*/ React.createElement(
      Actions,
      null,
      /*#__PURE__*/ React.createElement(
        ActionItem,
        null,
        /*#__PURE__*/ React.createElement(
          Button,
          {
            appearance: 'primary',
            onClick: onInsert,
            testId: 'ModalElementBrowser__insert-button'
          },
          'Insert'
        )
      ),
      /*#__PURE__*/ React.createElement(
        ActionItem,
        null,
        /*#__PURE__*/ React.createElement(
          Button,
          {
            appearance: 'subtle',
            onClick: onClose,
            testId: 'ModalElementBrowser__close-button'
          },
          'Close'
        )
      )
    )
  )
}

const Actions = styled.div`
  display: inline-flex;
  margin: 0 -4px;
`
const ActionItem = styled.div`
  flex: 1 0 auto;
  margin: 0 4px;
`
const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  box-sizing: border-box;
  padding: ${MODAL_WRAPPER_PADDING}px ${MODAL_WRAPPER_PADDING}px 0 10px;
  overflow: hidden;
  background-color: ${themed({
    light: N0,
    dark: DN50
  })()};
  border-radius: ${borderRadius()}px;
`
export default injectIntl(ModalElementBrowser)
