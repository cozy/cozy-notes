import React from 'react'
import { render } from '@testing-library/react'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import SavingIndicator from './saving-indicator'
import { AppLike } from '../../../test/AppLike'

jest.mock('cozy-ui/transpiled/react/providers/Breakpoints')

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
  on,
  off: jest.fn()
}

global.document.createRange = jest.fn()

function itMatchSnapshot(collabProvider) {
  it('should match snapshot', () => {
    const { container } = render(
      <AppLike>
        <SavingIndicator collabProvider={collabProvider} />
      </AppLike>
    )
    expect(container).toMatchSnapshot()
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
