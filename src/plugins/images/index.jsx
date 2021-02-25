import React from 'react'
import { createPlugin } from './pm-plugins/main'
import inputRulePlugin from './pm-plugins/input-rule'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import { insertExternalImage } from './pm-plugins/commands'
const onUpload = files => {
  console.warn('attentions files', files)
}
const CozyImagePlugin = () => ({
  pmPlugins() {
    return [
      {
        name: 'cozyImage',
        plugin: createPlugin
      },
      {
        name: 'cozyImageInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema)
      }
    ]
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    disabled,
    isToolbarReducedSpacing
  }) {
    return (
      <FileInput
        label={'toto'}
        onChange={() => {
          const { state, dispatch } = editorView
          onUpload()
          insertExternalImage({ src: 'htotot' })(state, dispatch)
        }}
        data-test-id="upload-btn"
        value={[]}
        // FileInput needs to stay rendered until the onChange event, so we prevent the event from bubbling
        onClick={e => e.stopPropagation()}
      >
        <span>Test</span>
      </FileInput>
    )
  }
})

export default CozyImagePlugin
