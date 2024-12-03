import { render } from '@testing-library/react'
import React from 'react'

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
