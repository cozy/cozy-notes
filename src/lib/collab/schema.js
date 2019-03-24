import {
  processPluginsList,
  createSchema,
} from '@atlaskit/editor-common/create-editor/create-editor'
import {
  createPluginsList
} from '@atlaskit/editor-common/create-editor/create-plugins-list'

import editorConfig from '../../components/notes/editor_config'

const createAnalyticsEvent = undefined




function getPlugins(editorConfig, createAnalyticsEvent) {
  return createPluginList(editorProps, createAnalyticsEvent);
}


const config = processPluginsList(
  getPlugins(
    options.props.editorProps,
    options.props.createAnalyticsEvent,
  ),
  options.props.editorProps,
); -

const schema = createSchema(config)

export default schema
