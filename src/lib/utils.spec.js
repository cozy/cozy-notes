import { getSharedDocument } from './utils'

describe('getSharedDocument', () => {
  function setupClient(verbs = []) {
    return {
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
                  values: ['first', 'other']
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
