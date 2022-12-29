import { initApp } from './index'
import { getDataset } from 'lib/initFromDom'

jest.mock('lib/initFromDom', () => ({
  ...jest.requireActual('lib/initFromDom'),
  getDataset: jest.fn().mockReturnValue({}),
  getPublicSharecode: jest.fn().mockReturnValue('ABCD')
}))

jest.mock('@atlaskit/editor-core/i18n', () => ({
  fr: {},
  en: {}
}))

describe('app init', () => {
  it('loads with the users locale', () => {
    getDataset.mockReturnValue({ locale: 'fr', app: {} })
    const { appLocale } = initApp()
    expect(appLocale).toEqual('fr')
  })

  it('falls back to a supported locale', () => {
    getDataset.mockReturnValue({ locale: 'made-up-locale', app: {} })
    const { appLocale } = initApp()
    expect(appLocale).toEqual('en')
  })
})
