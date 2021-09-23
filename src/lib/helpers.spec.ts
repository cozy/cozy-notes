import { removeFilename } from './helpers'

describe('removeFilename', () => {
  it('Works with 0 level', () => {
    const filename = '/Foo'
    const filepath = ''

    expect(removeFilename(filepath + filename)).toBe(filename)
  })

  it('Works with 1 level', () => {
    const filename = '/Foo'
    const filepath = '/Bar'

    expect(removeFilename(filepath + filename)).toBe(filepath)
  })

  it('Works with 2 level', () => {
    const filename = '/Foo'
    const filepath = '/Foo/Bar'

    expect(removeFilename(filepath + filename)).toBe(filepath)
  })

  it('Works with input without slashes by returning input', () => {
    const input = 'FooBarBaz'

    expect(removeFilename(input)).toBe(input)
  })

  it('Works with unusual slashes in input', () => {
    const filename = '/z'
    const filepath = 'Fo/o/B//a/r/B///a'

    expect(removeFilename(filepath + filename)).toBe(filepath)
  })

  it('Works with empty input', () => {
    const input = ''

    expect(removeFilename(input)).toBe(input)
  })
})
