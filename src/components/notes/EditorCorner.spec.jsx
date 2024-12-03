import { render } from '@testing-library/react'
import React from 'react'
import { TestI18n } from 'test/AppLike'

import EditorCorner from './EditorCorner'

jest.mock('components/notes/sharing', () => {
  const MockSharing = () => <div data-testid="SharingWidget" />
  return MockSharing
})

describe('EditorCorner', () => {
  const setup = ({
    file = {},
    isPublic = false,
    isReadOnly = false,
    title = ''
  } = {}) => {
    return render(
      <TestI18n>
        <EditorCorner
          file={file}
          isPublic={isPublic}
          isReadOnly={isReadOnly}
          title={title}
        />
      </TestI18n>
    )
  }
  it('shows the sharing widget on private views - readOnly', () => {
    const readOnlyComponent = setup({ isReadOnly: true })

    expect(readOnlyComponent.getByTestId('SharingWidget')).toBeTruthy()
  })

  it('shows the sharing widget on private views - editable', () => {
    const editableComponent = setup()

    expect(editableComponent.getByTestId('SharingWidget')).toBeTruthy()
  })

  it('shows a read only indication on public views', () => {
    const component = setup({ isPublic: true, isReadOnly: true })

    expect(component.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <svg
            class="styles__icon___23x3R"
            height="16"
            style="fill: var(--primaryTextColor);"
            title="This note is in read-only mode."
            width="16"
          >
            <use
              xlink:href="#lock"
            />
          </svg>
        </div>
      </div>
    `)
  })

  it('renders nothing on a public view with write permissions', () => {
    const component = setup({ isPublic: true })

    expect(component.container).toBeEmptyDOMElement()
  })
})
