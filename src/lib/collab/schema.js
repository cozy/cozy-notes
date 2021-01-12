import { Schema } from 'prosemirror-model'

// static because the @atlaskit code base requires a real navigator
// TODO: either find and exclude plugins requiring interaction
//       or running a JSDOM faking a navigator
// @quentin: I don't understand yet why we need to do that, so if someone
// knows, then update the comment ;)

// To get the schema, we need to log the values from node_modules/@atlaskit/editor-core/dist/esm/create-editor/create-schema
// itself just before the call on new Schema({nodes, marks}) and then
//console.log({nodes})
//console.log({marks})
// to be able to copy paste the value in this file, click right on the log -> store as global value
// then copy(temp1) and then past it in the method written below.

/* const objectToArray = obj => {
  const nodesArray = []
  Object.keys(obj).map(key => {
    nodesArray.push([key, obj[key]])
  })
  return nodesArray
} */
//
// in order to convert it in Array.
// It seems that Atlaskit is using Schema containing an Object but prosemissor an Array
// Don't know yet why and if we can't reuse a code from atlaskit to do that transformation
// since they have to do it somewhere I think

//https://github.com/cozy/cozy-notes/pull/2/commits/202e529cdb1e71996c2cab43057984c9f885b61a

export const nodes = [
  [
    'date',
    {
      inline: true,
      group: 'inline',
      selectable: true,
      attrs: {
        timestamp: {
          default: ''
        }
      },
      parseDOM: [
        {
          tag: 'span[data-node-type="date"]'
        }
      ]
    }
  ],
  [
    'status',
    {
      inline: true,
      group: 'inline',
      selectable: true,
      attrs: {
        text: {
          default: ''
        },
        color: {
          default: ''
        },
        localId: {
          default: '046b16b8-790a-4097-881d-eb377338287b'
        },
        style: {
          default: ''
        }
      },
      parseDOM: [
        {
          tag: 'span[data-node-type="status"]'
        }
      ]
    }
  ],
  [
    'doc',
    {
      content: '(block)+',
      marks:
        'alignment breakout indentation link unsupportedMark unsupportedNodeAttribute'
    }
  ],
  [
    'paragraph',
    {
      selectable: false,
      content: 'inline*',
      group: 'block',
      marks:
        'strong code em link strike subsup textColor typeAheadQuery underline unsupportedMark unsupportedNodeAttribute',
      parseDOM: [
        {
          tag: 'p'
        }
      ]
    }
  ],
  [
    'text',
    {
      group: 'inline'
    }
  ],
  [
    'bulletList',
    {
      group: 'block',
      content: 'listItem+',
      selectable: false,
      parseDOM: [
        {
          tag: 'ul'
        }
      ],
      marks: 'unsupportedMark unsupportedNodeAttribute'
    }
  ],
  [
    'orderedList',
    {
      group: 'block',
      content: 'listItem+',
      marks: 'unsupportedMark unsupportedNodeAttribute',
      selectable: false,
      parseDOM: [
        {
          tag: 'ol'
        }
      ]
    }
  ],
  [
    'listItem',
    {
      content:
        '(paragraph | codeBlock) (paragraph | bulletList | orderedList | codeBlock)*',
      marks: 'link unsupportedMark unsupportedNodeAttribute',
      defining: true,
      selectable: false,
      parseDOM: [
        {
          tag: 'li'
        }
      ]
    }
  ],
  [
    'heading',
    {
      attrs: {
        level: {
          default: 1
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      selectable: false,
      parseDOM: [
        {
          tag: 'h1',
          attrs: {
            level: 1
          }
        },
        {
          tag: 'h2',
          attrs: {
            level: 2
          }
        },
        {
          tag: 'h3',
          attrs: {
            level: 3
          }
        },
        {
          tag: 'h4',
          attrs: {
            level: 4
          }
        },
        {
          tag: 'h5',
          attrs: {
            level: 5
          }
        },
        {
          tag: 'h6',
          attrs: {
            level: 6
          }
        }
      ]
    }
  ],
  [
    'blockquote',
    {
      content: 'paragraph+',
      group: 'block',
      defining: true,
      selectable: false,
      parseDOM: [
        {
          tag: 'blockquote'
        }
      ]
    }
  ],
  [
    'codeBlock',
    {
      attrs: {
        language: {
          default: null
        },
        uniqueId: {
          default: null
        }
      },
      content: 'text*',
      marks: 'unsupportedMark unsupportedNodeAttribute',
      group: 'block',
      code: true,
      defining: true,
      parseDOM: [
        {
          tag: 'pre',
          preserveWhitespace: 'full'
        },
        {
          tag: 'div[style]',
          preserveWhitespace: 'full'
        },
        {
          tag: 'table[style]',
          preserveWhitespace: 'full'
        },
        {
          tag: 'div.code-block',
          preserveWhitespace: 'full'
        }
      ]
    }
  ],
  [
    'rule',
    {
      group: 'block',
      parseDOM: [
        {
          tag: 'hr'
        }
      ]
    }
  ],
  [
    'panel',
    {
      group: 'block',
      content: '(paragraph | heading | bulletList | orderedList )+',
      marks: 'unsupportedMark unsupportedNodeAttribute',
      attrs: {
        panelType: {
          default: 'info'
        }
      },
      parseDOM: [
        {
          tag: 'div[data-panel-type]'
        }
      ]
    }
  ],
  [
    'confluenceUnsupportedBlock',
    {
      group: 'block',
      attrs: {
        cxhtml: {
          default: null
        }
      },
      parseDOM: [
        {
          tag: 'div[data-node-type="confluenceUnsupportedBlock"]'
        }
      ]
    }
  ],
  [
    'confluenceUnsupportedInline',
    {
      group: 'inline',
      inline: true,
      atom: true,
      attrs: {
        cxhtml: {
          default: null
        }
      },
      parseDOM: [
        {
          tag: 'div[data-node-type="confluenceUnsupportedInline"]'
        }
      ]
    }
  ],
  [
    'unsupportedBlock',
    {
      inline: false,
      group: 'block',
      atom: true,
      selectable: true,
      attrs: {
        originalValue: {
          default: {}
        }
      },
      parseDOM: [
        {
          tag: '[data-node-type="unsupportedBlock"]'
        }
      ]
    }
  ],
  [
    'unsupportedInline',
    {
      inline: true,
      group: 'inline',
      selectable: true,
      attrs: {
        originalValue: {
          default: {}
        }
      },
      parseDOM: [
        {
          tag: '[data-node-type="unsupportedInline"]'
        }
      ]
    }
  ],
  [
    'hardBreak',
    {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [
        {
          tag: 'br'
        }
      ]
    }
  ],
  [
    'table',
    {
      content: 'tableRow+',
      attrs: {
        isNumberColumnEnabled: {
          default: false
        },
        layout: {
          default: 'default'
        },
        __autoSize: {
          default: false
        }
      },
      marks: 'unsupportedMark unsupportedNodeAttribute',
      tableRole: 'table',
      isolating: true,
      selectable: false,
      group: 'block',
      parseDOM: [
        {
          tag: 'table'
        }
      ]
    }
  ],
  [
    'tableHeader',
    {
      selectable: false,
      content:
        '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | codeBlock )+',
      attrs: {
        colspan: {
          default: 1
        },
        rowspan: {
          default: 1
        },
        colwidth: {
          default: null
        },
        background: {
          default: null
        }
      },
      tableRole: 'header_cell',
      isolating: true,
      marks: 'link alignment unsupportedMark unsupportedNodeAttribute',
      parseDOM: [
        {
          tag: 'th'
        }
      ]
    }
  ],
  [
    'tableRow',
    {
      selectable: false,
      content: '(tableCell | tableHeader)+',
      marks: 'unsupportedMark unsupportedNodeAttribute',
      tableRole: 'row',
      parseDOM: [
        {
          tag: 'tr'
        }
      ]
    }
  ],
  [
    'tableCell',
    {
      selectable: false,
      content:
        '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | codeBlock | unsupportedBlock)+',
      attrs: {
        colspan: {
          default: 1
        },
        rowspan: {
          default: 1
        },
        colwidth: {
          default: null
        },
        background: {
          default: null
        }
      },
      tableRole: 'cell',
      marks: 'link alignment unsupportedMark unsupportedNodeAttribute',
      isolating: true,
      parseDOM: [
        {
          tag: '.ak-renderer-table-number-column',
          ignore: true
        },
        {
          tag: 'td'
        }
      ]
    }
  ]
]

export const marks = [
  [
    'link',
    {
      excludes: 'link color',
      group: 'link',
      attrs: {
        href: {},
        __confluenceMetadata: {
          default: null
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: '[data-block-link]'
        },
        {
          tag: 'a[href]',
          context: 'paragraph/|heading/|mediaSingle/'
        },
        {
          tag: 'a[href]'
        }
      ]
    }
  ],
  [
    'em',
    {
      inclusive: true,
      group: 'fontStyle',
      parseDOM: [
        {
          tag: 'i'
        },
        {
          tag: 'em'
        },
        {
          style: 'font-style=italic'
        }
      ]
    }
  ],
  [
    'strong',
    {
      inclusive: true,
      group: 'fontStyle',
      parseDOM: [
        {
          tag: 'strong'
        },
        {
          tag: 'b'
        },
        {
          tag: 'span'
        }
      ]
    }
  ],
  [
    'textColor',
    {
      attrs: {
        color: {}
      },
      inclusive: true,
      group: 'color',
      parseDOM: [
        {
          style: 'color'
        }
      ]
    }
  ],
  [
    'strike',
    {
      inclusive: true,
      group: 'fontStyle',
      parseDOM: [
        {
          tag: 'strike'
        },
        {
          tag: 's'
        },
        {
          tag: 'del'
        },
        {
          style: 'text-decoration'
        }
      ]
    }
  ],
  [
    'subsup',
    {
      inclusive: true,
      group: 'fontStyle',
      attrs: {
        type: {
          default: 'sub'
        }
      },
      parseDOM: [
        {
          tag: 'sub',
          attrs: {
            type: 'sub'
          }
        },
        {
          tag: 'sup',
          attrs: {
            type: 'sup'
          }
        },
        {
          tag: 'span',
          style: 'vertical-align=super'
        },
        {
          tag: 'span',
          style: 'vertical-align=sub'
        }
      ]
    }
  ],
  [
    'underline',
    {
      inclusive: true,
      group: 'fontStyle',
      parseDOM: [
        {
          tag: 'u'
        },
        {
          style: 'text-decoration'
        }
      ]
    }
  ],
  [
    'code',
    {
      excludes: 'fontStyle link searchQuery color',
      inclusive: true,
      parseDOM: [
        {
          tag: 'span.code',
          preserveWhitespace: true
        },
        {
          tag: 'code',
          preserveWhitespace: true
        },
        {
          tag: 'tt',
          preserveWhitespace: true
        },
        {
          tag: 'span',
          preserveWhitespace: true
        }
      ]
    }
  ],
  [
    'typeAheadQuery',
    {
      inclusive: true,
      group: 'searchQuery',
      parseDOM: [
        {
          tag: 'span[data-type-ahead-query]'
        }
      ],
      attrs: {
        trigger: {
          default: ''
        }
      }
    }
  ],
  [
    'alignment',
    {
      excludes: 'alignment indentation',
      group: 'alignment',
      attrs: {
        align: {}
      },
      parseDOM: [
        {
          tag: 'div.fabric-editor-block-mark'
        }
      ]
    }
  ],
  [
    'breakout',
    {
      spanning: false,
      inclusive: false,
      parseDOM: [
        {
          tag: 'div.fabric-editor-breakout-mark'
        }
      ],
      attrs: {
        mode: {
          default: 'wide'
        }
      }
    }
  ],
  [
    'indentation',
    {
      excludes: 'indentation alignment',
      group: 'indentation',
      attrs: {
        level: {}
      },
      parseDOM: [
        {
          tag: 'div.fabric-editor-indentation-mark'
        }
      ]
    }
  ],
  [
    'unsupportedMark',
    {
      attrs: {
        originalValue: {}
      }
    }
  ],
  [
    'unsupportedNodeAttribute',
    {
      attrs: {
        type: {},
        unsupported: {}
      }
    }
  ]
]

function orderedToObject(ordered) {
  return ordered.reduce(function(acc, cur) {
    acc[cur[0]] = cur[1]
    return acc
  }, {})
}

export const schemaOrdered = {
  nodes,
  marks
}

export const schemaObject = {
  nodes: orderedToObject(nodes),
  marks: orderedToObject(marks)
}

export const schemaVersion = 1

const schema = new Schema(schemaObject)

export default schema
