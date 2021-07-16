import React from 'react'
import { createPlugin } from './pm-plugins/main'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import { startImageUpload } from './pm-plugins/commands'
import { stateKey } from './pm-plugins/plugin-key'
import { inputRulePlugin } from '@atlaskit/editor-core/plugins/image-upload/pm-plugins/input-rule'
import WithPluginState from '../../../editor-core/src/ui/WithPluginState'

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

  primaryToolbarComponent({ editorView }) {
    return (
      <WithPluginState
        plugins={{
          cozyImage: stateKey
        }}
        render={() => {
          return (
            <FileInput
              data-file-input
              onChange={e => {
                const { state, dispatch } = editorView
                startImageUpload(e)(state, dispatch)
              }}
              onClick={e => e.stopPropagation()}
            ></FileInput>
          )
        }}
      />
    )
  }
})

export default CozyImagePlugin
