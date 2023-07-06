import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import EditorView from 'components/notes/editor-view'
import SaveButton from 'components/intents/SaveButton'

const IntentEditorView = () => {
  const { t } = useI18n()
  const [title, setTitle] = useState('')

  const handleTitleChange = el => {
    setTitle(el.target.value)
  }

  return (
    <EditorView
      defaultTitle={t('Notes.Editor.title_placeholder')}
      isIntents
      onTitleChange={handleTitleChange}
    >
      <SaveButton title={title} />
    </EditorView>
  )
}

export default IntentEditorView
