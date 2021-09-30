import { EditorPlugin } from '@atlaskit/editor-core/types'
import { createPlugin } from './pm-plugins/main'
import inputRulePlugin from './pm-plugins/input-rule'
import './event-handlers'

const imageUpload = (): EditorPlugin => ({
  name: 'imageUpload',

  pmPlugins() {
    return [
      {
        name: 'imageUpload',
        plugin: createPlugin
      },
      {
        name: 'imageUploadInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema)
      }
    ]
  }
})

export default imageUpload
