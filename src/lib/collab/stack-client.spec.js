import ServiceClient from './stack-client'

// eslint-disable-next-line no-unused-vars
import CozyRealtime from 'cozy-realtime'

import { createMockClient } from 'cozy-client/dist/mock'

const userId = 'myuser'
const docId = 'e3a0921e38f9687cd9e8c60a3c04f9d0'
const sessionId = userId + ':1577115994661.661.0.16413785152829485'
const cozyClient = createMockClient({})
const realtime = { subscribe: jest.fn() }
const serverDoc = {
  content: [
    {
      content: [{ text: 'dzdzad', type: 'text' }],
      type: 'paragraph'
    },
    { type: 'paragraph' }
  ],
  type: 'doc'
}
const remoteSchema = {
  marks: [
    [
      'link',
      {
        attrs: {
          __confluenceMetadata: { default: null },
          href: {}
        },
        excludes: 'color',
        group: 'link',
        inclusive: false,
        parseDOM: [{ tag: 'a[href]' }]
      }
    ],
    [
      'em',
      {
        group: 'fontStyle',
        inclusive: true,
        parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }]
      }
    ],
    [
      'strong',
      {
        group: 'fontStyle',
        inclusive: true,
        parseDOM: [{ tag: 'strong' }, { tag: 'b' }, { style: 'font-weight' }]
      }
    ],
    [
      'textColor',
      {
        attrs: { color: {} },
        group: 'color',
        inclusive: true,
        parseDOM: [{ style: 'color' }]
      }
    ],
    [
      'strike',
      {
        group: 'fontStyle',
        inclusive: true,
        parseDOM: [
          { tag: 'strike' },
          { tag: 's' },
          { tag: 'del' },
          { style: 'text-decoration' }
        ]
      }
    ],
    [
      'subsup',
      {
        attrs: { type: { default: 'sub' } },
        group: 'fontStyle',
        inclusive: true,
        parseDOM: [
          { attrs: { type: 'sub' }, tag: 'sub' },
          { attrs: { type: 'sup' }, tag: 'sup' }
        ]
      }
    ],
    [
      'underline',
      {
        group: 'fontStyle',
        inclusive: true,
        parseDOM: [{ tag: 'u' }, { style: 'text-decoration' }]
      }
    ],
    [
      'code',
      {
        excludes: 'fontStyle link searchQuery color',
        inclusive: true,
        parseDOM: [
          { preserveWhitespace: true, tag: 'span.code' },
          { preserveWhitespace: true, tag: 'code' },
          { preserveWhitespace: true, tag: 'tt' },
          { preserveWhitespace: true, tag: 'span' }
        ]
      }
    ],
    [
      'typeAheadQuery',
      {
        attrs: { trigger: { default: '' } },
        excludes: 'searchQuery',
        group: 'searchQuery',
        inclusive: true,
        parseDOM: [{ tag: 'span[data-type-ahead-query]' }]
      }
    ]
  ],
  nodes: [
    ['doc', { content: '(block)+', marks: 'link' }],
    [
      'paragraph',
      {
        content: 'inline*',
        group: 'block',
        marks:
          'strong code em link strike subsup textColor typeAheadQuery underline',
        parseDOM: [{ tag: 'p' }]
      }
    ],
    ['text', { group: 'inline' }],
    [
      'bulletList',
      {
        content: 'listItem+',
        group: 'block',
        parseDOM: [{ tag: 'ul' }]
      }
    ],
    [
      'orderedList',
      {
        content: 'listItem+',
        group: 'block',
        parseDOM: [{ tag: 'ol' }]
      }
    ],
    [
      'listItem',
      {
        content: '(paragraph ) (paragraph | bulletList | orderedList )*',
        defining: true,
        parseDOM: [{ tag: 'li' }]
      }
    ],
    [
      'heading',
      {
        attrs: { level: { default: 1 } },
        content: 'inline*',
        defining: true,
        group: 'block',
        parseDOM: [
          { attrs: { level: 1 }, tag: 'h1' },
          { attrs: { level: 2 }, tag: 'h2' },
          { attrs: { level: 3 }, tag: 'h3' },
          { attrs: { level: 4 }, tag: 'h4' },
          { attrs: { level: 5 }, tag: 'h5' },
          { attrs: { level: 6 }, tag: 'h6' }
        ]
      }
    ],
    [
      'blockquote',
      {
        content: 'paragraph+',
        defining: true,
        group: 'block',
        parseDOM: [{ tag: 'blockquote' }],
        selectable: false
      }
    ],
    ['rule', { group: 'block', parseDOM: [{ tag: 'hr' }] }],
    [
      'panel',
      {
        attrs: { panelType: { default: 'info' } },
        content: '(paragraph | heading | bulletList | orderedList)+',
        group: 'block',
        parseDOM: [{ tag: 'div[data-panel-type]' }]
      }
    ],
    [
      'confluenceUnsupportedBlock',
      {
        attrs: { cxhtml: { default: null } },
        group: 'block',
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
        atom: true,
        attrs: { cxhtml: { default: null } },
        group: 'inline',
        inline: true,
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
        atom: true,
        attrs: { originalValue: { default: {} } },
        group: 'block',
        inline: false,
        parseDOM: [{ tag: '[data-node-type="unsupportedBlock"]' }],
        selectable: true
      }
    ],
    [
      'unsupportedInline',
      {
        attrs: { originalValue: { default: {} } },
        group: 'inline',
        inline: true,
        parseDOM: [{ tag: '[data-node-type="unsupportedInline"]' }],
        selectable: true
      }
    ],
    [
      'hardBreak',
      {
        group: 'inline',
        inline: true,
        parseDOM: [{ tag: 'br' }],
        selectable: false
      }
    ],
    [
      'table',
      {
        attrs: {
          __autoSize: { default: false },
          isNumberColumnEnabled: { default: false },
          layout: { default: 'default' }
        },
        content: 'tableRow+',
        group: 'block',
        isolating: true,
        parseDOM: [{ tag: 'table' }],
        selectable: false,
        tableRole: 'table'
      }
    ],
    [
      'tableHeader',
      {
        attrs: {
          background: { default: null },
          colspan: { default: 1 },
          colwidth: { default: null },
          rowspan: { default: 1 }
        },
        content:
          '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading )+',
        isolating: true,
        marks: '',
        parseDOM: [{ tag: 'th' }],
        tableRole: 'header_cell'
      }
    ],
    [
      'tableRow',
      {
        content: '(tableCell | tableHeader)+',
        parseDOM: [{ tag: 'tr' }],
        tableRole: 'row'
      }
    ],
    [
      'tableCell',
      {
        attrs: {
          background: { default: null },
          colspan: { default: 1 },
          colwidth: { default: null },
          rowspan: { default: 1 }
        },
        content:
          '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | unsupportedBlock)+',
        isolating: true,
        marks: '',
        parseDOM: [
          {
            ignore: true,
            tag: '.ak-renderer-table-number-column'
          },
          { tag: 'td' }
        ],
        tableRole: 'cell'
      }
    ]
  ]
}

describe('ServiceClient', () => {
  describe('__constructor', () => {
    it('instanciate', () => {
      const service = new ServiceClient({ userId, cozyClient })
      expect(service).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    const eventType = 'io.cozy.notes.events'
    const telepointerEvent = 'io.cozy.notes.telepointers'
    const telepointerUpdateDoc = {
      _id: docId,
      doctype: telepointerEvent,
      selection: { anchor: 6, head: 6, type: 'textSelection' },
      sessionID: sessionId,
      timestamp: 1577115996348,
      type: 'telepointer'
    }
    const stepsEvent = 'io.cozy.notes.steps'
    const stepsUpdateDoc = {
      _id: docId,
      _rev: '1-03dc114ca621366c35f9bef06205da53',
      doctype: stepsEvent,
      from: 6,
      sessionID: sessionId,
      slice: { content: [{ text: 'd', type: 'text' }] },
      stepType: 'replace',
      timestamp: 1577115996,
      to: 6,
      version: 7
    }
    const titleEvent = 'io.cozy.notes.documents'
    const newTitle = 'hello my new title'
    const titleUpdateDoc = {
      _id: docId,
      doctype: titleEvent,
      sessionID: sessionId,
      title: newTitle
    }
    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('join', () => {
      it('should subscribe to realtime', async () => {
        const service = new ServiceClient({ userId, cozyClient, realtime })
        await service.join(docId)
        expect(realtime.subscribe).toHaveBeenCalled()
        expect(realtime.subscribe.mock.calls[0][1]).toBe(eventType)
      })
    })

    describe('onStepsCreated', () => {
      it('should receive steps events from the stack', async () => {
        let callback
        realtime.subscribe.mockImplementation((verb, type, _, fn) => {
          if (verb == 'updated' && type == eventType) {
            callback = fn
          }
        })
        const onSteps = jest.fn()
        const service = new ServiceClient({ userId, cozyClient, realtime })
        await service.join(docId)
        await service.onStepsCreated(docId, onSteps)
        expect(callback).toBeDefined()
        callback(stepsUpdateDoc)
        expect(onSteps).toHaveBeenCalled()
        const data = onSteps.mock.calls[0][0]
        expect(data._id).toBe(docId)
        expect(data.doctype).toBe(stepsEvent)
      })
    })

    describe('onTelepointerUpdated', () => {
      it('should receive telepointers events from the stack', async () => {
        let callback
        realtime.subscribe.mockImplementation((verb, type, _, fn) => {
          if (verb == 'updated' && type == eventType) {
            callback = fn
          }
        })
        const onTelepointer = jest.fn()
        const service = new ServiceClient({ userId, cozyClient, realtime })
        await service.join(docId)
        await service.onTelepointerUpdated(docId, onTelepointer)
        expect(callback).toBeDefined()
        callback(telepointerUpdateDoc)
        expect(onTelepointer).toHaveBeenCalled()
        const data = onTelepointer.mock.calls[0][0]
        expect(data._id).toBe(docId)
        expect(data.doctype).toBe(telepointerEvent)
      })
    })

    describe('onTitleUpdated', () => {
      it('should receive new titles from the stack', async () => {
        let callback
        realtime.subscribe.mockImplementation((verb, type, _, fn) => {
          if (verb == 'updated' && type == eventType) {
            callback = fn
          }
        })
        const onTitle = jest.fn()
        const service = new ServiceClient({ userId, cozyClient, realtime })
        await service.join(docId)
        await service.onTitleUpdated(docId, onTitle)
        expect(callback).toBeDefined()
        callback(titleUpdateDoc)
        expect(onTitle).toHaveBeenCalled()
        const data = onTitle.mock.calls[0][0]
        expect(data).toBe(newTitle)
      })
    })

    it('should normalize `sessionId`', async () => {
      let callback
      realtime.subscribe.mockImplementation((verb, type, _, fn) => {
        if (verb == 'updated' && type == eventType) {
          callback = fn
        }
      })
      const onSteps = jest.fn()
      const service = new ServiceClient({ userId, cozyClient, realtime })
      await service.join(docId)
      await service.onStepsCreated(docId, onSteps)
      expect(callback).toBeDefined()
      callback(stepsUpdateDoc)
      expect(onSteps).toHaveBeenCalled()
      const data = onSteps.mock.calls[0][0]
      expect(data.sessionId).toBe(sessionId)
    })
  })

  describe('create', () => {
    it('should call the stack with title and schema', async () => {
      const title = 'hello my title'
      const service = new ServiceClient({ userId, cozyClient })
      await service.create(title)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[0]).toBe('POST')
      expect(lastCall[1]).toBe('/notes')
      expect(lastCall[2].data.type).toBe('io.cozy.notes.documents')
      expect(lastCall[2].data.attributes.title).toBe(title)
    })
  })

  describe('setTitle', () => {
    it('should call the stack with title', async () => {
      const title = 'hello my new title'
      const service = new ServiceClient({ userId, cozyClient })
      await service.setTitle(docId, title)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[0]).toBe('PUT')
      expect(lastCall[1]).toBe(`/notes/${docId}/title`)
      expect(lastCall[2].data.type).toBe('io.cozy.notes.documents')
      expect(lastCall[2].data.attributes.title).toBe(title)
    })
  })

  describe('getDoc', () => {
    const serverTitle = 'hello my title'
    const serverVersion = 739
    const serverResponse = {
      data: {
        type: 'io.cozy.files',
        id: docId,
        attributes: {
          type: 'file',
          name: 'zdzadda.cozy-note',
          dir_id: '3a939b2e2156693b2e8946201c0009e5',
          created_at: '2019-12-20T18:08:44.305705+01:00',
          updated_at: '2019-12-23T17:57:27.551408+01:00',
          size: '6',
          md5sum: null,
          mime: 'text/markdown',
          class: 'text',
          executable: false,
          trashed: false,
          tags: [],
          metadata: {
            content: serverDoc,
            schema: remoteSchema,
            title: serverTitle,
            version: serverVersion
          }
        }
      }
    }

    beforeEach(() => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => serverResponse)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call the stack', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      await service.getDoc(docId)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[0]).toBe('GET')
      expect(lastCall[1]).toBe(`/notes/${docId}`)
    })

    it('should return the doc content', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      const { doc } = await service.getDoc(docId)
      expect(doc).toHaveProperty('type', 'doc')
      expect(doc).toHaveProperty('content')
    })

    it('should return the version', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      const { version } = await service.getDoc(docId)
      expect(version).toBe(serverVersion)
    })

    it('should return the title', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      const { title } = await service.getDoc(docId)
      expect(title).toBe(serverTitle)
    })

    it('should return the file document', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      const { file } = await service.getDoc(docId)
      expect(file.type).toBe('io.cozy.files')
      expect(file.id).toBe(docId)
    })
  })

  describe('pushSteps', () => {
    const localSteps = [
      {
        from: 1,
        sessionId: sessionId,
        slice: { content: [{ text: 'a', type: 'text' }] },
        stepType: 'replace',
        to: 1
      },
      {
        from: 1,
        sessionId: sessionId,
        slice: { content: [{ text: 'a', type: 'text' }] },
        stepType: 'replace',
        to: 1
      }
    ]
    localSteps.forEach(step => {
      step.toJSON = () => step
    })
    const localVersion = 739

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should send to the server', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      await service.pushSteps(docId, localVersion, localSteps)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[0]).toBe('PATCH')
      expect(lastCall[1]).toBe(`/notes/${docId}`)
      expect(lastCall[2].data).toHaveLength(localSteps.length)
      // for conflict resolution
      expect(lastCall[3]).toHaveProperty('headers.if-match', localVersion)
    })

    it('should send io.cozy.notes.steps documents', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      await service.pushSteps(docId, localVersion, localSteps)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[2]).toHaveProperty('data.0.type', 'io.cozy.notes.steps')
      expect(lastCall[2]).toHaveProperty('data.0.attributes')
    })

    it('should throw on error (needed for an HTTP 409)', async () => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => {
        throw new Error()
      })
      const service = new ServiceClient({ userId, cozyClient })
      const push = service.pushSteps(docId, localVersion, localSteps)
      await expect(push).rejects.toBeInstanceOf(Error)
    })
  })

  describe('getSteps', () => {
    const localVersion = 3
    const remoteVersion = 5
    const remoteTitle = 'this is a brand new title'
    const remoteSteps = {
      data: [
        {
          type: 'io.cozy.notes.steps',
          attributes: {
            sessionID: '543781490137',
            stepType: 'replace',
            from: 1,
            to: 1,
            slice: {
              content: [{ type: 'text', text: 'H' }]
            },
            version: remoteVersion - 1
          }
        },
        {
          type: 'io.cozy.notes.steps',
          attributes: {
            sessionID: '543781490137',
            stepType: 'replace',
            from: 2,
            to: 2,
            slice: {
              content: [{ type: 'text', text: 'ello' }]
            },
            version: remoteVersion
          }
        }
      ]
    }
    const remoteDocument = {
      data: {
        type: 'io.cozy.files',
        id: docId,
        attributes: {
          type: 'file',
          name: 'zdzadda.cozy-note',
          dir_id: '3a939b2e2156693b2e8946201c0009e5',
          created_at: '2019-12-20T18:08:44.305705+01:00',
          updated_at: '2019-12-23T17:57:27.551408+01:00',
          size: '6',
          md5sum: null,
          mime: 'text/markdown',
          class: 'text',
          executable: false,
          trashed: false,
          tags: [],
          metadata: {
            content: serverDoc,
            schema: remoteSchema,
            title: remoteTitle,
            version: remoteVersion
          }
        }
      }
    }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should ask the server', async () => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => ({ data: [] }))
      const service = new ServiceClient({ userId, cozyClient })
      await service.getSteps(docId, localVersion)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[0]).toBe('GET')
      expect(lastCall[1]).toBe(`/notes/${docId}/steps?Version=${localVersion}`)
    })

    it('should return steps when the server has some', async () => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => remoteSteps)
      const service = new ServiceClient({ userId, cozyClient })
      const res = await service.getSteps(docId, localVersion)
      expect(res).toHaveProperty('version', remoteVersion)
      expect(res).toHaveProperty('steps')
      expect(res.steps).toHaveLength(2)
    })

    it('should return current version when there is 0 steps', async () => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => ({ data: [] }))
      const service = new ServiceClient({ userId, cozyClient })
      const res = await service.getSteps(docId, localVersion)
      expect(res).toHaveProperty('version', localVersion)
      expect(res).toHaveProperty('steps', [])
      expect(res.steps).toHaveLength(0)
    })

    it('should return a full document if the server does not have the required steps', async () => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => {
        throw {
          response: { status: 412 },
          reason: remoteDocument
        }
      })
      const service = new ServiceClient({ userId, cozyClient })
      const res = await service.getSteps(docId, localVersion)
      expect(res).toHaveProperty('version', remoteVersion)
      expect(res).not.toHaveProperty('steps')
      expect(res).toHaveProperty('doc', serverDoc)
    })

    it('should call title update when returning a full document', async () => {
      cozyClient.stackClient.fetchJSON.mockImplementation(() => {
        throw {
          response: { status: 412 },
          reason: remoteDocument
        }
      })
      const callback = jest.fn()
      const service = new ServiceClient({ userId, cozyClient })
      service.onTitleUpdated(docId, callback)
      await service.getSteps(docId, localVersion)
      expect(callback).toHaveBeenLastCalledWith(remoteTitle)
    })
  })

  describe('pushTelepointer', () => {
    const telepointerEvent = 'io.cozy.notes.telepointers'
    const telepointerData = {
      selection: { anchor: 202, head: 202, type: 'textSelection' },
      timestamp: 1577709100378,
      type: 'telepointer'
    }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should send data to the server', async () => {
      const service = new ServiceClient({ userId, cozyClient })
      await service.pushTelepointer(docId, telepointerData)
      expect(cozyClient.stackClient.fetchJSON).toHaveBeenCalled()
      const fetchJSON = cozyClient.stackClient.fetchJSON
      const called = fetchJSON.mock.calls.length
      const lastCall = fetchJSON.mock.calls[called - 1]
      expect(lastCall[0]).toBe('PUT')
      expect(lastCall[1]).toBe(`/notes/${docId}/telepointer`)
      expect(lastCall[2]).toHaveProperty('data.type', telepointerEvent)
      expect(lastCall[2]).toHaveProperty('data.attributes.type', 'telepointer')
    })
  })
})
