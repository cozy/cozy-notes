import {
  getSharedDocument,
  fetchIfIsNoteReadOnly,
  getFolderLink,
  relativeAge,
  getUserNameFromUrl
} from './utils'

function setupClient(verbs = [], ids = ['first', 'other']) {
  return {
    find: doctype => ({
      getById: id => {
        const parents = {
          'first-ggchild': 'first-gchild',
          'first-gchild': 'first-child',
          'first-child': 'first'
        }
        return {
          data: {
            _id: id,
            id: id,
            _type: doctype,
            type: doctype,
            attributes: {
              dir_id: parents[id]
            },
            relationships: {
              parent: {
                data: {
                  id: parents[id],
                  type: doctype
                }
              }
            }
          }
        }
      }
    }),
    query: async data => data,
    collection: () => ({
      getOwnPermissions: async () => ({
        data: {
          id: '9385e37389cb9f71a230168f245df2f8',
          _id: '9385e37389cb9f71a230168f245df2f8',
          _type: 'io.cozy.permissions',
          type: 'io.cozy.permissions',
          attributes: {
            type: 'share',
            source_id: 'io.cozy.apps/notes',
            permissions: {
              files: {
                type: 'io.cozy.files',
                verbs: verbs,
                values: ids
              },
              album: {
                type: 'io.cozy.photo.albums',
                verbs: verbs,
                values: ['third']
              }
            },
            shortcodes: {
              email: 'k7oMbB11jKFR'
            }
          }
        }
      })
    })
  }
}

describe('getSharedDocument', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {})
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('fetches the first document in the permission list', async () => {
    const client = setupClient()
    const { id } = await getSharedDocument(client)
    expect(id).toEqual('first')
  })

  describe('when we have a PATCH permission', () => {
    it('should return read-write', async () => {
      const client = setupClient(['GET', 'PATCH', 'PUT'])
      const { readOnly } = await getSharedDocument(client)
      expect(readOnly).toBeFalsy()
    })
  })

  describe('when we have a ALL permission', () => {
    it('should return read-write', async () => {
      const client = setupClient(['ALL'])
      const { readOnly } = await getSharedDocument(client)
      expect(readOnly).toBeFalsy()
    })
  })

  describe('when we have only a GET permission', () => {
    it('should return read-only', async () => {
      const client = setupClient(['GET'])
      const { readOnly } = await getSharedDocument(client)
      expect(readOnly).toBeTruthy()
    })
  })
})

describe('fetchIfIsNoteReadOnly', () => {
  ;[
    ['only one individual file permission', ['only'], 'only'],
    ['a permission for this file', ['first', 'second'], 'first'],
    ['a permission for an ancestor', ['first', 'second'], 'first-ggchild']
  ].forEach(data => {
    describe(`when there is ${data[0]}`, () => {
      describe('when we have a PATCH permission', () => {
        it('should return read-write', async () => {
          const client = setupClient(['GET', 'PATCH'], data[1])
          expect(fetchIfIsNoteReadOnly(client, data[2])).resolves.toBeFalsy()
        })
      })
      describe('when we only have a GET permission', () => {
        it('should return read-only', async () => {
          const client = setupClient(['GET'], data[1])
          expect(fetchIfIsNoteReadOnly(client, data[2])).resolves.toBeTruthy()
        })
      })
    })
  })
})

describe('getFolderLink', () => {
  describe('when root-dir', () => {
    it('should be #/folder/io.cozy.files.root-dir', () => {
      const id = 'io.cozy.files.root-dir'
      expect(getFolderLink(id)).toEqual('/folder/io.cozy.files.root-dir')
    })
  })
})

describe('relativeAge', () => {
  // constants
  const sec = 1000
  const min = 60 * sec
  it('should return the correct data for age=3s', () => {
    expect(relativeAge(3 * sec)).toEqual({
      key: 'just_now',
      unit: sec,
      coef: 1,
      time: 3,
      interval: sec
    })
  })
  it('should return the correct data for age=53min', () => {
    expect(relativeAge(53 * min)).toEqual({
      key: 'mins_ago',
      unit: min,
      coef: 10,
      time: 50,
      interval: 10 * min
    })
  })
})

describe('getUserNameFromUrl', () => {
  it('should return the url part', () => {
    window.history.pushState(
      {},
      'Test Title',
      '/test.html?username=hello+world'
    )
    expect(getUserNameFromUrl()).toEqual('hello world')
  })
  it('should return null when not present', () => {
    window.history.pushState({}, 'Test Title', '/test.html')
    expect(getUserNameFromUrl()).toBeNull()
  })
})
