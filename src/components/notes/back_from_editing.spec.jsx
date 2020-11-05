import React from 'react'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { mount } from 'enzyme'
import en from '../../locales/en.json'
import BackFromEditing from './back_from_editing'

describe('BackFromEditing', () => {
  it('mounts', () => {
    const returnUrl = '/'
    const requestToLeave = jest.fn()
    const file = {
      _id: 'uid',
      _type: 'io.cozy.files',
      attributes: {
        dir_id: 'parentuid'
      }
    }
    const component = mount(
      <BackFromEditing
        requestToLeave={requestToLeave}
        returnUrl={returnUrl}
        file={file}
      />,
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
})
