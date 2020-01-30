import React from 'react'
import { I18n } from 'cozy-ui/react/I18n'
import { mount } from 'enzyme'
import SavingIndicator from './saving-indicator'
import en from '../../locales/en.json'

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
    expect(component.html()).toMatchSnapshot()
  })
}

describe('SavingIndicator', () => {
  afterEach(() => jest.resetAllMocks())

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
            () => new Date(Date.now() - steps[key])
          )
        })
        itMatchSnapshot(collabProvider)
      })
    })
  })
})
