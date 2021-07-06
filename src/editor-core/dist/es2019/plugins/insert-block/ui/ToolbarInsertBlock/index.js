import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import ReactDOM from 'react-dom'
import { injectIntl } from 'react-intl'
import { EmojiPicker as AkEmojiPicker } from '@atlaskit/emoji/picker'
import { Popup } from '@atlaskit/editor-common'
import { akEditorMenuZIndex } from '@atlaskit/editor-shared-styles'
import DropdownMenu from '../../../../ui/DropdownMenu'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { Separator, ButtonGroup, Wrapper } from '../../../../ui/styles'
import { createTable } from '../../../table/commands'
import { insertDate, openDatePicker } from '../../../date/actions'
import { openElementBrowserModal } from '../../../quick-insert/commands'
import { showPlaceholderFloatingToolbar } from '../../../placeholder-text/actions'
import { createHorizontalRule } from '../../../rule/pm-plugins/input-rule'
import { insertLayoutColumnsWithAnalytics } from '../../../layout/actions'
import { insertTaskDecision } from '../../../tasks-and-decisions/commands'
import { insertExpand } from '../../../expand/commands'
import { showLinkToolbar } from '../../../hyperlink/commands'
import { insertMentionQuery } from '../../../mentions/commands/insert-mention-query'
import { updateStatusWithAnalytics } from '../../../status/actions'
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INPUT_METHOD,
  withAnalytics as commandWithAnalytics
} from '../../../analytics'
import { insertEmoji } from '../../../emoji/commands/insert-emoji'
import InsertMenu from '../../../../ui/ElementBrowser/InsertMenu'
import { messages } from './messages'
import { createItems } from './create-items'
import { DropDownButton } from './dropdown-button'
import memoizeOne from 'memoize-one'
/**
 * Checks if an element is detached (i.e. not in the current document)
 */

const isDetachedElement = el => !document.body.contains(el)

const noop = () => {}

class ToolbarInsertBlock extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      isPlusMenuOpen: false,
      emojiPickerOpen: false,
      buttons: [],
      dropdownItems: []
    })

    _defineProperty(this, 'onOpenChange', attrs => {
      const state = {
        isPlusMenuOpen: attrs.isPlusMenuOpen,
        emojiPickerOpen: this.state.emojiPickerOpen
      }

      if (this.state.emojiPickerOpen && !attrs.open) {
        state.emojiPickerOpen = false
      }

      this.setState(state, () => {
        const { dispatchAnalyticsEvent } = this.props

        if (!dispatchAnalyticsEvent) {
          return
        }

        const { isPlusMenuOpen } = this.state

        if (isPlusMenuOpen) {
          return dispatchAnalyticsEvent({
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PLUS_MENU,
            eventType: EVENT_TYPE.UI
          })
        }

        return dispatchAnalyticsEvent({
          action: ACTION.CLOSED,
          actionSubject: ACTION_SUBJECT.PLUS_MENU,
          eventType: EVENT_TYPE.UI
        })
      })
    })

    _defineProperty(this, 'togglePlusMenuVisibility', () => {
      const { isPlusMenuOpen } = this.state
      this.onOpenChange({
        isPlusMenuOpen: !isPlusMenuOpen
      })
    })

    _defineProperty(
      this,
      'toggleEmojiPicker',
      (inputMethod = INPUT_METHOD.TOOLBAR) => {
        this.setState(
          prevState => ({
            emojiPickerOpen: !prevState.emojiPickerOpen
          }),
          () => {
            if (this.state.emojiPickerOpen) {
              const { dispatchAnalyticsEvent } = this.props

              if (dispatchAnalyticsEvent) {
                dispatchAnalyticsEvent({
                  action: ACTION.OPENED,
                  actionSubject: ACTION_SUBJECT.PICKER,
                  actionSubjectId: ACTION_SUBJECT_ID.PICKER_EMOJI,
                  attributes: {
                    inputMethod
                  },
                  eventType: EVENT_TYPE.UI
                })
              }
            }
          }
        )
      }
    )

    _defineProperty(this, 'handleEmojiButtonRef', button => {
      const ref = ReactDOM.findDOMNode(button)

      if (ref) {
        this.emojiButtonRef = ref
      }
    })

    _defineProperty(this, 'handlePlusButtonRef', button => {
      const ref = ReactDOM.findDOMNode(button)

      if (ref) {
        this.plusButtonRef = ref
      }
    })

    _defineProperty(this, 'handleDropDownButtonRef', button => {
      const ref = ReactDOM.findDOMNode(button)

      if (ref) {
        this.dropdownButtonRef = ref
      }
    })

    _defineProperty(this, 'onPickerRef', ref => {
      if (ref) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }

      this.pickerRef = ref
    })

    _defineProperty(this, 'handleClickOutside', e => {
      const picker = this.pickerRef && ReactDOM.findDOMNode(this.pickerRef) // Ignore click events for detached elements.
      // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
      // still in the document, and one once it's detached. Does not always occur, and
      // may be a side effect of a react render optimisation

      if (
        !picker ||
        (e.target && !isDetachedElement(e.target) && !picker.contains(e.target))
      ) {
        this.toggleEmojiPicker()
      }
    })

    _defineProperty(
      this,
      'toDropdownItems',
      memoizeOne(items => [
        {
          items
        }
      ])
    )

    _defineProperty(this, 'toggleLinkPanel', inputMethod => {
      const { editorView } = this.props
      showLinkToolbar(inputMethod)(editorView.state, editorView.dispatch)
      return true
    })

    _defineProperty(this, 'insertMention', inputMethod => {
      const { editorView } = this.props
      insertMentionQuery(inputMethod)(editorView.state, editorView.dispatch)
      return true
    })

    _defineProperty(this, 'insertTable', inputMethod => {
      const { editorView } = this.props
      return commandWithAnalytics({
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.TABLE,
        attributes: {
          inputMethod
        },
        eventType: EVENT_TYPE.TRACK
      })(createTable)(editorView.state, editorView.dispatch)
    })

    _defineProperty(this, 'createDate', inputMethod => {
      const { editorView } = this.props
      insertDate(undefined, inputMethod)(editorView.state, editorView.dispatch)
      openDatePicker()(editorView.state, editorView.dispatch)
      return true
    })

    _defineProperty(this, 'createPlaceholderText', () => {
      const { editorView } = this.props
      showPlaceholderFloatingToolbar(editorView.state, editorView.dispatch)
      return true
    })

    _defineProperty(this, 'insertLayoutColumns', inputMethod => {
      const { editorView } = this.props
      insertLayoutColumnsWithAnalytics(inputMethod)(
        editorView.state,
        editorView.dispatch
      )
      return true
    })

    _defineProperty(this, 'createStatus', inputMethod => {
      const { editorView } = this.props
      updateStatusWithAnalytics(inputMethod)(
        editorView.state,
        editorView.dispatch
      )
      return true
    })

    _defineProperty(this, 'openMediaPicker', inputMethod => {
      const { onShowMediaPicker, dispatchAnalyticsEvent } = this.props

      if (onShowMediaPicker) {
        onShowMediaPicker()

        if (dispatchAnalyticsEvent) {
          dispatchAnalyticsEvent({
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: {
              inputMethod
            },
            eventType: EVENT_TYPE.UI
          })
        }
      }

      return true
    })

    _defineProperty(this, 'insertTaskDecision', (name, inputMethod) => () => {
      const { editorView } = this.props

      if (!editorView) {
        return false
      }

      const listType = name === 'action' ? 'taskList' : 'decisionList'
      insertTaskDecision(
        editorView,
        listType,
        inputMethod
      )(editorView.state, editorView.dispatch)
      return true
    })

    _defineProperty(this, 'insertHorizontalRule', inputMethod => {
      const { editorView } = this.props
      const tr = createHorizontalRule(
        editorView.state,
        editorView.state.selection.from,
        editorView.state.selection.to,
        inputMethod
      )

      if (tr) {
        editorView.dispatch(tr)
        return true
      }

      return false
    })

    _defineProperty(this, 'insertExpand', () => {
      const { state, dispatch } = this.props.editorView
      return insertExpand(state, dispatch)
    })

    _defineProperty(this, 'insertBlockType', itemName => () => {
      const { editorView, onInsertBlockType } = this.props
      const { state, dispatch } = editorView
      onInsertBlockType(itemName)(state, dispatch)
      return true
    })

    _defineProperty(this, 'handleSelectedEmoji', emojiId => {
      this.props.editorView.focus()
      insertEmoji(emojiId, INPUT_METHOD.PICKER)(
        this.props.editorView.state,
        this.props.editorView.dispatch
      )
      this.toggleEmojiPicker()
      return true
    })

    _defineProperty(this, 'openElementBrowser', () => {
      openElementBrowserModal()(
        this.props.editorView.state,
        this.props.editorView.dispatch
      )
    })

    _defineProperty(this, 'onItemActivated', ({ item, inputMethod }) => {
      const {
        editorView,
        editorActions,
        handleImageUpload,
        expandEnabled
      } = this.props // need to do this before inserting nodes so scrollIntoView works properly

      if (!editorView.hasFocus()) {
        editorView.focus()
      }

      switch (item.value.name) {
        case 'link':
          this.toggleLinkPanel(inputMethod)
          break

        case 'table':
          this.insertTable(inputMethod)
          break

        case 'image upload':
          if (handleImageUpload) {
            const { state, dispatch } = editorView
            handleImageUpload()(state, dispatch)
          }

          break

        case 'media':
          this.openMediaPicker(inputMethod)
          break

        case 'mention':
          this.insertMention(inputMethod)
          break

        case 'emoji':
          this.toggleEmojiPicker(inputMethod)
          break

        case 'codeblock':
        case 'blockquote':
        case 'panel':
          this.insertBlockType(item.value.name)()
          break

        case 'action':
        case 'decision':
          this.insertTaskDecision(item.value.name, inputMethod)()
          break

        case 'horizontalrule':
          this.insertHorizontalRule(inputMethod)
          break

        case 'macro':
          this.openElementBrowser()
          break

        case 'date':
          this.createDate(inputMethod)
          break

        case 'placeholder text':
          this.createPlaceholderText()
          break

        case 'layout':
          this.insertLayoutColumns(inputMethod)
          break

        case 'status':
          this.createStatus(inputMethod)
          break
        // https://product-fabric.atlassian.net/browse/ED-8053
        // @ts-ignore: OK to fallthrough to default

        case 'expand':
          if (expandEnabled) {
            this.insertExpand()
            break
          }

        // eslint-disable-next-line no-fallthrough

        default:
          if (item && item.onClick) {
            item.onClick(editorActions)
            break
          }
      }

      this.setState({
        isPlusMenuOpen: false
      })
    })

    _defineProperty(this, 'insertToolbarMenuItem', btn =>
      this.onItemActivated({
        item: btn,
        inputMethod: INPUT_METHOD.TOOLBAR
      })
    )

    _defineProperty(this, 'insertInsertMenuItem', ({ item }) =>
      this.onItemActivated({
        item,
        inputMethod: INPUT_METHOD.INSERT_MENU
      })
    )
  }

  static getDerivedStateFromProps(props, state) {
    const [buttons, dropdownItems] = createItems({
      isTypeAheadAllowed: props.isTypeAheadAllowed,
      tableSupported: props.tableSupported,
      mediaUploadsEnabled: props.mediaUploadsEnabled,
      mediaSupported: props.mediaSupported,
      imageUploadSupported: props.imageUploadSupported,
      imageUploadEnabled: props.imageUploadEnabled,
      mentionsSupported: props.mentionsSupported,
      actionSupported: props.actionSupported,
      decisionSupported: props.decisionSupported,
      linkSupported: props.linkSupported,
      linkDisabled: props.linkDisabled,
      emojiDisabled: props.emojiDisabled,
      nativeStatusSupported: props.nativeStatusSupported,
      dateEnabled: props.dateEnabled,
      placeholderTextEnabled: props.placeholderTextEnabled,
      horizontalRuleEnabled: props.horizontalRuleEnabled,
      layoutSectionEnabled: props.layoutSectionEnabled,
      expandEnabled: props.expandEnabled,
      macroProvider: props.macroProvider,
      showElementBrowserLink: props.showElementBrowserLink,
      emojiProvider: props.emojiProvider,
      availableWrapperBlockTypes: props.availableWrapperBlockTypes,
      insertMenuItems: props.insertMenuItems,
      schema: props.editorView.state.schema,
      numberOfButtons: props.buttons,
      formatMessage: props.intl.formatMessage,
      isNewMenuEnabled: props.replacePlusMenuWithElementBrowser
    })
    return { ...state, buttons, dropdownItems }
  }

  componentDidUpdate(prevProps) {
    // If number of visible buttons changed, close emoji picker
    if (prevProps.buttons !== this.props.buttons) {
      this.setState({
        emojiPickerOpen: false
      })
    }
  }

  renderPopup() {
    const { emojiPickerOpen } = this.state
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      emojiProvider
    } = this.props
    const dropdownEmoji = this.state.dropdownItems.some(
      ({ value: { name } }) => name === 'emoji'
    )
    const ref = dropdownEmoji ? this.dropdownButtonRef : this.emojiButtonRef

    if (!emojiPickerOpen || !ref || !emojiProvider) {
      return null
    }

    return /*#__PURE__*/ React.createElement(
      Popup,
      {
        target: ref,
        fitHeight: 350,
        fitWidth: 350,
        offset: [0, 3],
        mountTo: popupsMountPoint,
        boundariesElement: popupsBoundariesElement,
        scrollableElement: popupsScrollableElement
      },
      /*#__PURE__*/ React.createElement(AkEmojiPicker, {
        emojiProvider: emojiProvider,
        onSelection: this.handleSelectedEmoji,
        onPickerRef: this.onPickerRef
      })
    )
  }

  getLegacyInsertMenu() {
    const { isPlusMenuOpen, dropdownItems } = this.state
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isDisabled,
      isReducedSpacing,
      intl: { formatMessage }
    } = this.props
    const dropDownLabel = formatMessage(messages.insertMenu)
    const spacing = isReducedSpacing ? 'none' : 'default'
    return /*#__PURE__*/ React.createElement(
      DropdownMenu,
      {
        items: this.toDropdownItems(dropdownItems),
        onItemActivated: this.insertInsertMenuItem,
        onOpenChange: this.onOpenChange,
        mountTo: popupsMountPoint,
        boundariesElement: popupsBoundariesElement,
        scrollableElement: popupsScrollableElement,
        isOpen: isPlusMenuOpen,
        fitHeight: 188,
        fitWidth: 175,
        zIndex: akEditorMenuZIndex
      },
      /*#__PURE__*/ React.createElement(DropDownButton, {
        handleRef: this.handleDropDownButtonRef,
        selected: isPlusMenuOpen,
        disabled: isDisabled,
        onClick: this.togglePlusMenuVisibility,
        spacing: spacing,
        label: dropDownLabel
      })
    )
  }

  getElementBrowserForInsertMenu() {
    const { isPlusMenuOpen, dropdownItems } = this.state
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isDisabled,
      isReducedSpacing,
      intl: { formatMessage },
      editorView
    } = this.props
    const dropDownLabel = formatMessage(messages.insertMenu)
    const spacing = isReducedSpacing ? 'none' : 'default'
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      isPlusMenuOpen &&
        /*#__PURE__*/ React.createElement(
          Popup,
          {
            target: this.plusButtonRef,
            fitHeight: 500,
            fitWidth: 350,
            offset: [0, 3],
            mountTo: popupsMountPoint,
            boundariesElement: popupsBoundariesElement,
            scrollableElement: popupsScrollableElement
          },
          /*#__PURE__*/ React.createElement(InsertMenu, {
            editorView: editorView,
            dropdownItems: dropdownItems,
            onInsert: this.insertInsertMenuItem,
            toggleVisiblity: this.togglePlusMenuVisibility
          })
        ),
      /*#__PURE__*/ React.createElement(DropDownButton, {
        handleRef: this.handlePlusButtonRef,
        selected: isPlusMenuOpen,
        disabled: isDisabled,
        onClick: this.togglePlusMenuVisibility,
        spacing: spacing,
        label: dropDownLabel
      })
    )
  }

  renderInsertMenu() {
    const { isPlusMenuOpen, dropdownItems } = this.state
    const {
      isDisabled,
      isReducedSpacing,
      intl: { formatMessage },
      replacePlusMenuWithElementBrowser
    } = this.props
    const dropDownLabel = formatMessage(messages.insertMenu)
    const spacing = isReducedSpacing ? 'none' : 'default'

    if (dropdownItems.length === 0 || isDisabled) {
      return /*#__PURE__*/ React.createElement(
        'div',
        null,
        /*#__PURE__*/ React.createElement(DropDownButton, {
          handleRef: this.handleDropDownButtonRef,
          selected: isPlusMenuOpen,
          disabled: isDisabled,
          onClick: this.togglePlusMenuVisibility,
          spacing: spacing,
          label: dropDownLabel
        })
      )
    }

    return replacePlusMenuWithElementBrowser
      ? this.getElementBrowserForInsertMenu()
      : this.getLegacyInsertMenu()
  }

  render() {
    const { buttons, dropdownItems } = this.state
    const { isDisabled, isReducedSpacing } = this.props

    if (buttons.length === 0 && dropdownItems.length === 0) {
      return null
    }

    return /*#__PURE__*/ React.createElement(
      ButtonGroup,
      {
        width: isReducedSpacing ? 'small' : 'large'
      },
      buttons.map(btn =>
        /*#__PURE__*/ React.createElement(ToolbarButton, {
          item: btn,
          ref: btn.value.name === 'emoji' ? this.handleEmojiButtonRef : noop,
          key: btn.value.name,
          spacing: isReducedSpacing ? 'none' : 'default',
          disabled: isDisabled || btn.isDisabled,
          iconBefore: btn.elemBefore,
          selected: btn.isActive,
          title: btn.title,
          onItemClick: this.insertToolbarMenuItem
        })
      ),
      /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        this.renderPopup(),
        this.renderInsertMenu()
      ),
      this.props.showSeparator &&
        /*#__PURE__*/ React.createElement(Separator, null)
    )
  }
}

export default injectIntl(ToolbarInsertBlock)
