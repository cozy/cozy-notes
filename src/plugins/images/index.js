import { createPlugin } from './pm-plugins/main'
import inputRulePlugin from './pm-plugins/input-rule'

const test = () => ({
  name: 'cozyImage',

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
  }
})

export default test
