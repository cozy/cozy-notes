import _defineProperty from '@babel/runtime/helpers/defineProperty'
import { Plugin, PluginKey } from 'prosemirror-state'
export class ReactNodeViewState {
  constructor() {
    _defineProperty(this, 'changeHandlers', [])

    this.changeHandlers = []
  }

  subscribe(cb) {
    this.changeHandlers.push(cb)
  }

  unsubscribe(cb) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb)
  }

  notifyNewSelection(fromPos, toPos) {
    this.changeHandlers.forEach(cb => cb(fromPos, toPos))
  }
}
export const stateKey = new PluginKey('reactNodeView')
export const plugin = new Plugin({
  state: {
    init() {
      return new ReactNodeViewState()
    },

    apply(_tr, pluginState) {
      return pluginState
    }
  },
  key: stateKey,
  view: view => {
    const pluginState = stateKey.getState(view.state)
    return {
      update: view => {
        const { from, to } = view.state.selection
        pluginState.notifyNewSelection(from, to)
      }
    }
  }
})

const plugins = () => [plugin]

export default plugins
