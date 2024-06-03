import '@testing-library/jest-dom'

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

expect.addSnapshotSerializer({
  test: function(val) {
    return val && typeof val === 'string' && val.indexOf('mui-') >= 0
  },
  print: function(val) {
    let str = val
    str = str.replace(/mui-[0-9]*/g, 'mui-00000')

    return `"${str}"`
  }
})

jest.mock('cozy-ui/transpiled/react/I18n', () => ({
  createUseI18n: () => ({ t: x => x }),
  translate: () => () => ({ t: x => x }),
  useI18n: () => ({ t: x => x })
}))

jest.mock('prosemirror-collab', () => {
  return { getVersion: jest.fn(), sendableSteps: jest.fn() }
})
