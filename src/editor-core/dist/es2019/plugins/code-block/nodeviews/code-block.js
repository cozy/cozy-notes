import _defineProperty from '@babel/runtime/helpers/defineProperty'
import rafSchedule from 'raf-schd'
import { DOMSerializer } from 'prosemirror-model'
import { browser } from '@atlaskit/editor-common'
import { codeBlockClassNames } from '../ui/class-names'
const MATCH_NEWLINES = new RegExp('\n', 'g') // For browsers <= IE11, we apply style overrides to render a basic code box

const isIE11 = browser.ie && browser.ie_version <= 11

const toDOM = node => [
  'div',
  {
    class: 'code-block' + (isIE11 ? ' ie11' : '')
  },
  [
    'div',
    {
      class: codeBlockClassNames.gutter,
      contenteditable: 'false'
    }
  ],
  [
    'div',
    {
      class: codeBlockClassNames.content
    },
    [
      'pre',
      [
        'code',
        {
          'data-language': node.attrs.language || '',
          spellcheck: 'false'
        },
        0
      ]
    ]
  ]
]

export class CodeBlockView {
  constructor(_node, view, getPos) {
    _defineProperty(
      this,
      'ensureLineNumbers',
      rafSchedule(() => {
        let lines = 1
        this.node.forEach(node => {
          const text = node.text

          if (text) {
            lines += (node.text.match(MATCH_NEWLINES) || []).length
          }
        })

        while (this.lineNumberGutter.childElementCount < lines) {
          this.lineNumberGutter.appendChild(document.createElement('span'))
        }

        while (this.lineNumberGutter.childElementCount > lines) {
          this.lineNumberGutter.removeChild(this.lineNumberGutter.lastChild)
        }
      })
    )

    const { dom, contentDOM } = DOMSerializer.renderSpec(document, toDOM(_node))
    this.getPos = getPos
    this.view = view
    this.node = _node
    this.dom = dom
    this.contentDOM = contentDOM
    this.lineNumberGutter = this.dom.querySelector(
      `.${codeBlockClassNames.gutter}`
    )
    this.ensureLineNumbers()
  }

  update(node) {
    if (node.type !== this.node.type) {
      return false
    }

    if (node !== this.node) {
      if (node.attrs.language !== this.node.attrs.language) {
        this.contentDOM.setAttribute('data-language', node.attrs.language || '')
      }

      this.node = node
      this.ensureLineNumbers()
    }

    return true
  }

  ignoreMutation(record) {
    // Ensure updating the line-number gutter doesn't trigger reparsing the codeblock
    return (
      record.target === this.lineNumberGutter ||
      record.target.parentNode === this.lineNumberGutter
    )
  }
}
export const codeBlockNodeView = () => (node, view, getPos) =>
  new CodeBlockView(node, view, getPos)
