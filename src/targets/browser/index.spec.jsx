import { initApp } from './index'
import { render } from 'react-dom'
import { getDataset } from 'lib/initFromDom'

jest.mock('lib/initFromDom', () => ({
  ...jest.requireActual('lib/initFromDom'),
  getDataset: jest.fn().mockReturnValue({})
}))

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  render: jest.fn()
}))

describe('app init', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('loads with the users locale', () => {
    getDataset.mockReturnValue({ cozyLocale: 'fr' })
    initApp()
    expect(render.mock.calls[0][0]).toMatchObject({ props: { lang: 'fr' } })
  })

  it('falls back to a supported locale', () => {
    getDataset.mockReturnValue({ cozyLocale: 'made-up-locale' })
    initApp()
    expect(render.mock.calls[0][0]).toMatchObject({ props: { lang: 'en' } })
  })
})
