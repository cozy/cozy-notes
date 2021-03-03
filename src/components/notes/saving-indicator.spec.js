import React from 'react'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { mount } from 'enzyme'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import SavingIndicator from './saving-indicator'
import en from '../../locales/en.json'

jest.mock('cozy-ui/transpiled/react/hooks/useBreakpoints')

const sec = 1000
const min = 60 * sec
const hour = 60 * min
const day = 24 * hour

const getDirtySince = jest.fn()
const isDirty = () => !!getDirtySince()
const getLastSaveOrSync = jest.fn()
const on = jest.fn()

const collabProvider = {
  isDirty,
  getDirtySince,
  getLastSaveOrSync,
  on
}

global.document.createRange = jest.fn()

/**
 * Removes the varying part in MUI IDs,
 * which otherwise changes at each run
 *
 * See https://github.com/mui-org/material-ui/issues/21293
 *
 * @param {string} html
 * @returns {string}
 */
function normalizeMUI(html) {
  return html.replace(/(mui-[a-z0-9-]+)"/g, 'mui-"')
}

function itMatchSnapshot(collabProvider) {
  it('should match snapshot', () => {
    const component = mount(
      <SavingIndicator collabProvider={collabProvider} />,
      {
        wrappingComponent: I18n,
        wrappingComponentProps: {
          lang: 'en',
          dictRequire: () => en
        }
      }
    )
    expect(normalizeMUI(component.html())).toMatchSnapshot()
  })
}

describe('SavingIndicator', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => ({
      isMobile: false
    }))

    // createRange is used by the MUI Tooltip for its placement
    global.document.createRange.mockImplementation(() => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    }))
  })

  describe('when dirtySince is truthy', () => {
    describe('when dirtySince is a few minutes ago', () => {
      beforeEach(() => {
        getDirtySince.mockImplementation(() => new Date(Date.now() - 15 * min))
      })
      itMatchSnapshot(collabProvider)
    })
    describe('when dirtySince is a few seconds ago', () => {
      beforeEach(() => {
        getDirtySince.mockImplementation(() => new Date(Date.now() - 2 * sec))
      })
      itMatchSnapshot(collabProvider)
    })
  })

  describe('when dirtySince is falsy', () => {
    const steps = {
      'few seconds': 2 * sec,
      '45 sec': 45 * sec,
      '1 min': 1 * min,
      '5 min': 5 * min,
      '15 min': 15 * min,
      '28 min': 28 * min,
      '50 min': 50 * min,
      '1 hour': 1 * hour,
      '3 hour': 3 * hour,
      '1 day': 1 * day,
      '10 day': 10 * day
    }
    Object.keys(steps).forEach(key => {
      describe(`when lastSave is ${key} ago`, () => {
        beforeEach(() => {
          getLastSaveOrSync.mockImplementation(
            () => new Date(Date.now() - steps[key] - 500)
          )
        })
        itMatchSnapshot(collabProvider)
      })
    })
  })

  describe('when offline', () => {
    beforeEach(() => {
      jest.spyOn(global.navigator, 'onLine', 'get').mockReturnValue(false)
    })
    // tooltip should be here
    itMatchSnapshot(collabProvider)
  })

  describe('when online', () => {
    beforeEach(() => {
      jest.spyOn(global.navigator, 'onLine', 'get').mockReturnValue(true)
    })
    // tooltip shouldn't be here
    itMatchSnapshot(collabProvider)
  })
})
