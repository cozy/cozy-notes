// Used in products integration code
alert('test')

export { name, version } from './version-wrapper'
export { clearEditorContent, insertRule } from './commands'
export { default as Editor } from './editor'
export { default as EditorContext } from './ui/EditorContext'
export { default as WithEditorActions } from './ui/WithEditorActions'
export { default as WithHelpTrigger } from './ui/WithHelpTrigger'
export { default as CollapsedEditor } from './ui/CollapsedEditor'
export { default as ToolbarHelp } from './ui/ToolbarHelp'
export { default as ToolbarFeedback } from './ui/ToolbarFeedback'
export { default as ContextPanel } from './ui/ContextPanel'
export { EmojiResource } from '@atlaskit/emoji/resource'
export { default as mediaPlugin, insertMediaSingleNode } from './plugins/media'
export {
  AbstractMentionResource,
  MentionResource,
  PresenceResource
} from '@atlaskit/mention/resource'
export { TeamMentionResource } from '@atlaskit/mention/team-resource'
export { AnnotationUpdateEmitter } from './plugins/annotation'
// Used in mobile bridge
export { stateKey as mediaPluginKey } from './plugins/media/pm-plugins/main'
export { mentionPluginKey } from './plugins/mentions'
export { pluginKey as textFormattingStateKey } from './plugins/text-formatting/pm-plugins/main'
export { textColorPluginKey } from './plugins/text-color'
export { changeColor } from './plugins/text-color/commands/change-color'
export { blockPluginStateKey } from './plugins'
export {
  InsertStatus as HyperlinkInsertStatus,
  stateKey as hyperlinkStateKey
} from './plugins/hyperlink/pm-plugins/main'
export { pluginKey as listsStateKey } from './plugins/lists/pm-plugins/main'
export {
  indentList,
  outdentList,
  toggleOrderedList,
  toggleBulletList
} from './plugins/lists/commands'
export {
  toggleSuperscript,
  toggleSuperscriptWithAnalytics,
  toggleSubscript,
  toggleSubscriptWithAnalytics,
  toggleStrike,
  toggleStrikeWithAnalytics,
  toggleCode,
  toggleCodeWithAnalytics,
  toggleUnderline,
  toggleUnderlineWithAnalytics,
  toggleEm,
  toggleEmWithAnalytics,
  toggleStrong,
  toggleStrongWithAnalytics
} from './plugins/text-formatting/commands/text-formatting'
export {
  insertBlockType,
  insertBlockTypesWithAnalytics,
  setBlockType,
  setBlockTypeWithAnalytics
} from './plugins/block-type/commands'
export { createTable } from './plugins/table/commands'
export { insertTaskDecision } from './plugins/tasks-and-decisions/commands'
export { EventDispatcher } from './event-dispatcher'
export { pluginKey as statusPluginKey } from './plugins/status/plugin'
export {
  commitStatusPicker,
  setStatusPickerAt,
  updateStatus,
  updateStatusWithAnalytics
} from './plugins/status/actions'
export { typeAheadPluginKey } from './plugins/type-ahead'
export {
  pluginKey as quickInsertPluginKey,
  processItems as processQuickInsertItems
} from './plugins/quick-insert'
export { selectItem } from './plugins/type-ahead/commands/select-item'
export { insertTypeAheadQuery } from './plugins/type-ahead/commands/insert-query'
export { dismissCommand } from './plugins/type-ahead/commands/dismiss'
export {
  insertLink,
  insertLinkWithAnalytics,
  isTextAtPos,
  isLinkAtPos,
  setLinkHref,
  setLinkText
} from './plugins/hyperlink/commands'
export { historyPluginKey } from './plugins/history'
export {
  INPUT_METHOD,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE
} from './plugins/analytics'
export {
  setKeyboardHeight,
  setMobilePaddingTop
} from './plugins/mobile-scroll/commands' // Used in editor-test-helpers

export { setTextSelection } from './utils'
export { ReactEditorView } from './create-editor'
export { getDefaultPresetOptionsFromEditorProps } from './create-editor'
export { default as EditorActions } from './actions' // Re-export from provider factory to not cause a breaking change

export {
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer
} from './ui/PortalProvider'
export {
  GapCursorSelection,
  Side as GapCursorSide
} from './plugins/selection/gap-cursor-selection'
export { insertMentionQuery } from './plugins/mentions/commands/insert-mention-query'
export { insertEmojiQuery } from './plugins/emoji/commands/insert-emoji-query'
export { selectionPluginKey } from './plugins/mobile-selection'
export { insertExpand } from './plugins/expand/commands'
