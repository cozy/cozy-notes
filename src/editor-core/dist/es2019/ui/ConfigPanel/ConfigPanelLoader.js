import Loadable from 'react-loadable'
import LoadingState from './LoadingState'
export default Loadable({
  loader: () =>
    import(
      /* webpackChunkName:"@atlaskit-internal-editor-core-config-panel" */
      './FieldsLoader'
    ).then(module => module.default),
  loading: LoadingState
})
