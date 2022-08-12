import React from 'react'
import { render } from '@testing-library/react'
import BackFromEditing from './back_from_editing'

jest.mock('cozy-ui/transpiled/react/I18n', () => ({
  useI18n: () => ({ t: x => x })
}))

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
    const { container } = render(
      <BackFromEditing
        requestToLeave={requestToLeave}
        returnUrl={returnUrl}
        file={file}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
