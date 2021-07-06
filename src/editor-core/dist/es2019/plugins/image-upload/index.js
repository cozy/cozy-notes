import { createPlugin } from './pm-plugins/main'
import inputRulePlugin from './pm-plugins/input-rule'

const test = () => ({
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

export default test
