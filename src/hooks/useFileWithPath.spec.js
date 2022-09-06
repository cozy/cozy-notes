import { normalizeAndAddName } from './useFileWithPath'

describe('normalizeAndAddName', () => {
  it('should work with only id', () => {
    const res = normalizeAndAddName({ id: 'fileId' })

    expect(res).toStrictEqual({
      _id: 'fileId',
      _type: 'io.cozy.files',
      id: 'fileId',
      name: undefined
    })
  })

  it('should work with id and name', () => {
    const res = normalizeAndAddName({ id: 'fileId', name: 'fileName' })

    expect(res).toStrictEqual({
      _id: 'fileId',
      _type: 'io.cozy.files',
      id: 'fileId',
      name: 'fileName'
    })
  })

  it('should work with id and name attributes', () => {
    const res = normalizeAndAddName({
      id: 'fileId',
      attributes: { name: 'fileNameFromAttributes' }
    })

    expect(res).toStrictEqual({
      _id: 'fileId',
      _type: 'io.cozy.files',
      id: 'fileId',
      attributes: { name: 'fileNameFromAttributes' },
      name: 'fileNameFromAttributes'
    })
  })
})
