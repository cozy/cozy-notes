import React from 'react'
import { createPlugin } from './pm-plugins/main'
import inputRulePlugin from './pm-plugins/input-rule'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import { insertExternalImage, startImageUpload } from './pm-plugins/commands'
import { stateKey } from './pm-plugins/plugin-key'
import WithPluginState from '../../editor-core/dist/es2019/ui/WithPluginState'

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
      <WithPluginState
        plugins={{
          cozyImage: stateKey
        }}
        render={props => {
          console.log('props render', props)
          return (
            <FileInput
              label={'toto'}
              onChange={e => {
                const { state, dispatch } = editorView
                console.error('startUpload')
                startImageUpload(e)(state, dispatch)
                console.error('onUpload ?')
                //onUpload()
                //console.error('insertManuel ?!')
                /* insertExternalImage({
                  src:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png'
                })(state, dispatch) */
              }}
              data-test-id="upload-btn"
              value={[]}
              // FileInput needs to stay rendered until the onChange event, so we prevent the event from bubbling
              onClick={e => e.stopPropagation()}
            >
              <span>Test</span>
            </FileInput>
          )
        }}
      />
    )
  },

  contentComponent({
    editorView,
    dispatchAnalyticsEvent,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement
  }) {
    console.error('Content Component')
    const { state, dispatch } = editorView
    return (
      <WithPluginState
        plugins={{
          cozyImage: stateKey
        }}
        render={props => {
          console.error('content component', props)
          return <span>toto</span>
        }}
      />
    )
  }
})

export default CozyImagePlugin
