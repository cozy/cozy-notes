import { DecorationSet, Decoration } from 'prosemirror-view'
import { PluginKey, Plugin } from 'prosemirror-state'
import { ZERO_WIDTH_SPACE } from '@atlaskit/editor-common'
export const inlineCursorTargetStateKey = new PluginKey(
  'inlineCursorTargetPlugin'
)
export const SPECIAL_NODES = ['mention', 'emoji']
export const isSpecial = node => {
  return node && SPECIAL_NODES.indexOf(node.type.name) !== -1
}
export const findSpecialNodeAfter = ($pos, tr) => {
  if (isSpecial($pos.nodeAfter)) {
    return $pos.pos + 1
  }

  const { parentOffset, parent } = $pos
  const docSize = tr.doc.nodeSize - 2

  if (parentOffset === parent.content.size && $pos.pos + 1 < docSize - 2) {
    const { nodeAfter } = tr.doc.resolve($pos.pos + 1)

    if (nodeAfter && isSpecial(nodeAfter.firstChild)) {
      return $pos.pos + 2
    }
  }

  return
}
export const findSpecialNodeBefore = ($pos, tr) => {
  if (isSpecial($pos.nodeBefore)) {
    return $pos.pos - 1
  }

  if ($pos.pos === 0) {
    return
  }

  const { parentOffset } = $pos

  if (parentOffset === 0) {
    const { nodeBefore } = tr.doc.resolve($pos.pos - 1)

    if (nodeBefore && isSpecial(nodeBefore.firstChild)) {
      return $pos.pos - 2
    }
  }

  return
}
export default () => {
  return new Plugin({
    key: inlineCursorTargetStateKey,
    state: {
      init: () => ({
        positions: []
      }),

      apply(tr) {
        const { selection } = tr
        const { $from } = selection
        const positions = []
        const posAfter = findSpecialNodeAfter($from, tr)
        const posBefore = findSpecialNodeBefore($from, tr)

        if (posAfter !== undefined) {
          positions.push(posAfter)
        }

        if (posBefore !== undefined) {
          positions.push(posBefore)
        }

        return {
          positions
        }
      }
    },
    props: {
      decorations(state) {
        const { doc } = state
        const { positions } = inlineCursorTargetStateKey.getState(state)

        if (positions && positions.length) {
          const decorations = positions.map(position => {
            const node = document.createElement('span')
            node.appendChild(document.createTextNode(ZERO_WIDTH_SPACE))
            return Decoration.widget(position, node, {
              raw: true,
              side: -1,
              key: 'inlineCursor'
            })
          })
          return DecorationSet.create(doc, decorations)
        }

        return null
      }
    }
  })
}
