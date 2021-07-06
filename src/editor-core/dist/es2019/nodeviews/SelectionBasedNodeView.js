import _defineProperty from '@babel/runtime/helpers/defineProperty'
import { NodeSelection } from 'prosemirror-state'
import { stateKey as SelectionChangePluginKey } from '../plugins/base/pm-plugins/react-nodeview'
import ReactNodeView from './ReactNodeView'
/**
 * A ReactNodeView that handles React components sensitive
 * to selection changes.
 *
 * If the selection changes, it will attempt to re-render the
 * React component. Otherwise it does nothing.
 *
 * You can subclass `viewShouldUpdate` to include other
 * props that your component might want to consider before
 * entering the React lifecycle. These are usually props you
 * compare in `shouldComponentUpdate`.
 *
 * An example:
 *
 * ```
 * viewShouldUpdate(nextNode) {
 *   if (nextNode.attrs !== this.node.attrs) {
 *     return true;
 *   }
 *
 *   return super.viewShouldUpdate(nextNode);
 * }```
 */

export class SelectionBasedNodeView extends ReactNodeView {
  constructor(
    node,
    view,
    getPos,
    portalProviderAPI,
    eventDispatcher,
    reactComponentProps,
    reactComponent,
    hasContext = false,
    viewShouldUpdate
  ) {
    super(
      node,
      view,
      getPos,
      portalProviderAPI,
      eventDispatcher,
      reactComponentProps,
      reactComponent,
      hasContext,
      viewShouldUpdate
    )

    _defineProperty(this, 'isNodeInsideSelection', (from, to, pos, posEnd) => {
      ;({ pos, posEnd } = this.getPositionsWithDefault(pos, posEnd))

      if (typeof pos !== 'number' || typeof posEnd !== 'number') {
        return false
      }

      return from <= pos && to >= posEnd
    })

    _defineProperty(this, 'isSelectionInsideNode', (from, to, pos, posEnd) => {
      ;({ pos, posEnd } = this.getPositionsWithDefault(pos, posEnd))

      if (typeof pos !== 'number' || typeof posEnd !== 'number') {
        return false
      }

      return pos < from && to < posEnd
    })

    _defineProperty(this, 'isSelectedNode', selection => {
      if (selection instanceof NodeSelection) {
        const {
          selection: { from, to }
        } = this.view.state
        return (
          selection.node === this.node || // If nodes are not the same object, we check if they are referring to the same document node
          (this.pos === from &&
            this.posEnd === to &&
            selection.node.eq(this.node))
        )
      }

      return false
    })

    _defineProperty(this, 'insideSelection', () => {
      const {
        selection: { from, to }
      } = this.view.state
      return (
        this.isSelectedNode(this.view.state.selection) ||
        this.isSelectionInsideNode(from, to)
      )
    })

    _defineProperty(this, 'onSelectionChange', () => {
      this.update(this.node, [])
    })

    this.updatePos()
    this.oldSelection = view.state.selection
    this.selectionChangeState = SelectionChangePluginKey.getState(
      this.view.state
    )
    this.selectionChangeState.subscribe(this.onSelectionChange)
  }
  /**
   * Update current node's start and end positions.
   *
   * Prefer `this.pos` rather than getPos(), because calling getPos is
   * expensive, unless you know you're definitely going to render.
   */

  updatePos() {
    if (typeof this.getPos === 'boolean') {
      return
    }

    this.pos = this.getPos()
    this.posEnd = this.pos + this.node.nodeSize
  }

  getPositionsWithDefault(pos, posEnd) {
    return {
      pos: typeof pos !== 'number' ? this.pos : pos,
      posEnd: typeof posEnd !== 'number' ? this.posEnd : posEnd
    }
  }

  viewShouldUpdate(_nextNode) {
    const {
      state: { selection }
    } = this.view // update selection

    const oldSelection = this.oldSelection
    this.oldSelection = selection // update cached positions

    const { pos: oldPos, posEnd: oldPosEnd } = this
    this.updatePos()
    const { from, to } = selection
    const { from: oldFrom, to: oldTo } = oldSelection

    if (this.node.type.spec.selectable) {
      const newNodeSelection =
        selection instanceof NodeSelection && selection.from === this.pos
      const oldNodeSelection =
        oldSelection instanceof NodeSelection && oldSelection.from === this.pos

      if (
        (newNodeSelection && !oldNodeSelection) ||
        (oldNodeSelection && !newNodeSelection)
      ) {
        return true
      }
    }

    const movedInToSelection =
      this.isNodeInsideSelection(from, to) &&
      !this.isNodeInsideSelection(oldFrom, oldTo)
    const movedOutOfSelection =
      !this.isNodeInsideSelection(from, to) &&
      this.isNodeInsideSelection(oldFrom, oldTo)
    const moveOutFromOldSelection =
      this.isNodeInsideSelection(from, to, oldPos, oldPosEnd) &&
      !this.isNodeInsideSelection(from, to)

    if (movedInToSelection || movedOutOfSelection || moveOutFromOldSelection) {
      return true
    }

    return false
  }

  destroy() {
    this.selectionChangeState.unsubscribe(this.onSelectionChange)
    super.destroy()
  }
}
